// api/extract-video-from-link.js
// Извлекает видео из ссылок (X.com/Twitter, Instagram и т.д.)
// ENV: APIFY_TOKEN

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'url required' });

  const APIFY_TOKEN = process.env.APIFY_TOKEN;
  if (!APIFY_TOKEN) return res.status(500).json({ error: 'APIFY_TOKEN не настроен' });

  try {
    // Определяем источник по URL
    const videoSource = detectSource(url);
    if (!videoSource) {
      return res.status(400).json({ error: 'Unsupported URL — поддерживаются X.com, twitter.com, instagram.com' });
    }

    let videoData;

    if (videoSource === 'twitter' || videoSource === 'x') {
      videoData = await extractFromTwitter(url, APIFY_TOKEN);
    } else if (videoSource === 'instagram') {
      videoData = await extractFromInstagram(url, APIFY_TOKEN);
    }

    return res.status(200).json({
      success: true,
      source: videoSource,
      ...videoData,
    });

  } catch (error) {
    console.error('extract-video error:', error);
    return res.status(500).json({ error: error.message });
  }
}

function detectSource(url) {
  if (url.includes('x.com') || url.includes('twitter.com')) {
    return url.includes('x.com') ? 'x' : 'twitter';
  }
  if (url.includes('instagram.com')) {
    return 'instagram';
  }
  return null;
}

async function extractFromTwitter(url, apiToken) {
  // Используем Apify Twitter Scraper для извлечения видео из твитов
  // Actor: apify/twitter-scraper
  const tweetId = extractTweetId(url);

  if (!tweetId) {
    throw new Error('Could not extract tweet ID from URL');
  }

  const startRes = await fetch(
    `https://api.apify.com/v2/acts/apify~twitter-scraper/runs?token=${apiToken}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tweets: [`https://twitter.com/i/status/${tweetId}`],
        includeMediaUrls: true,
      }),
    }
  );

  if (!startRes.ok) {
    const err = await startRes.text();
    throw new Error(`Apify start failed: ${err}`);
  }

  const startData = await startRes.json();
  const runId = startData.data.id;
  const datasetId = startData.data.defaultDatasetId;

  // Ждём завершения Apify run (max 2 мин)
  let status = 'RUNNING';
  let attempts = 0;
  while (status === 'RUNNING' || status === 'READY' || status === 'ABORTING') {
    if (attempts++ > 24) throw new Error('Apify timeout');
    await sleep(5000);
    const statusRes = await fetch(
      `https://api.apify.com/v2/acts/apify~twitter-scraper/runs/${runId}?token=${apiToken}`
    );
    const statusData = await statusRes.json();
    status = statusData.data.status;
  }

  if (status !== 'SUCCEEDED') {
    throw new Error(`Apify failed with status: ${status}`);
  }

  // Получаем результаты
  const itemsRes = await fetch(
    `https://api.apify.com/v2/datasets/${datasetId}/items?token=${apiToken}`
  );
  const items = await itemsRes.json();

  if (!items || items.length === 0) {
    throw new Error('Tweet not found or has no video');
  }

  const tweet = items[0];
  const videoUrl = extractVideoUrl(tweet);

  if (!videoUrl) {
    throw new Error('No video found in tweet');
  }

  return {
    url: url,
    videoUrl: videoUrl,
    tweetId: tweetId,
    text: tweet.text || '',
    author: tweet.author || {},
    createdAt: tweet.createdAt,
    mediaUrls: tweet.mediaUrls || [],
  };
}

async function extractFromInstagram(url, apiToken) {
  // Используем Apify Instagram Scraper для извлечения видео из постов
  const postId = extractInstagramPostId(url);

  if (!postId) {
    throw new Error('Could not extract Instagram post ID from URL');
  }

  const startRes = await fetch(
    `https://api.apify.com/v2/acts/apify~instagram-scraper/runs?token=${apiToken}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        directUrls: [url],
        resultsLimit: 1,
      }),
    }
  );

  if (!startRes.ok) {
    const err = await startRes.text();
    throw new Error(`Apify start failed: ${err}`);
  }

  const startData = await startRes.json();
  const runId = startData.data.id;
  const datasetId = startData.data.defaultDatasetId;

  // Ждём завершения
  let status = 'RUNNING';
  let attempts = 0;
  while (status === 'RUNNING' || status === 'READY' || status === 'ABORTING') {
    if (attempts++ > 24) throw new Error('Apify timeout');
    await sleep(5000);
    const statusRes = await fetch(
      `https://api.apify.com/v2/acts/apify~instagram-scraper/runs/${runId}?token=${apiToken}`
    );
    const statusData = await statusRes.json();
    status = statusData.data.status;
  }

  if (status !== 'SUCCEEDED') {
    throw new Error(`Apify failed with status: ${status}`);
  }

  const itemsRes = await fetch(
    `https://api.apify.com/v2/datasets/${datasetId}/items?token=${apiToken}`
  );
  const items = await itemsRes.json();

  if (!items || items.length === 0) {
    throw new Error('Post not found or has no video');
  }

  const post = items[0];

  return {
    url: url,
    videoUrl: post.videoUrl,
    postId: postId,
    caption: post.caption || '',
    likes: post.likesCount || 0,
    comments: post.commentsCount || 0,
  };
}

function extractTweetId(url) {
  // Извлекаем ID твита из URL
  // Примеры: https://x.com/i/status/2074089635177746707
  //          https://twitter.com/i/status/2074089635177746707
  const match = url.match(/status\/(\d+)/);
  return match ? match[1] : null;
}

function extractInstagramPostId(url) {
  // Извлекаем ID поста из URL
  // Примеры: https://www.instagram.com/p/ABC123/
  //          https://instagram.com/p/ABC123/
  const match = url.match(/\/p\/([^/?]+)/);
  return match ? match[1] : null;
}

function extractVideoUrl(tweet) {
  // Извлекаем URL видео из объекта твита
  if (tweet.mediaUrls && tweet.mediaUrls.length > 0) {
    // Пытаемся найти видео среди медиа
    for (const media of tweet.mediaUrls) {
      if (media.includes('.mp4') || media.includes('video')) {
        return media;
      }
    }
    // Если нет явного видео, берём первое медиа
    return tweet.mediaUrls[0];
  }

  if (tweet.videoUrl) {
    return tweet.videoUrl;
  }

  return null;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
