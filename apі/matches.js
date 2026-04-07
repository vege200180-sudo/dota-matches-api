// GET /api/matches - Returns upcoming Dota 2 matches from Liquipedia

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://dota.haglund.dev/v1/matches');
    
    if (!response.ok) {
      throw new Error(`Upstream API returned ${response.status}`);
    }

    const matches = await response.json();

    // Filter valid matches (exclude TBD and unknown teams)
    const validMatches = matches.filter(m => 
      m.teams[0]?.name && 
      m.teams[1]?.name && 
      m.teams[0].name !== 'TBD' && 
      m.teams[1].name !== 'TBD' &&
      !m.teams[0].name.includes('page does not exist') &&
      !m.teams[1].name.includes('page does not exist')
    );

    return res.status(200).json({
      success: true,
      count: validMatches.length,
      matches: validMatches
    });

  } catch (error) {
    console.error('Error fetching matches:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch matches',
      message: error.message
    });
  }
}
