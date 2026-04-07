// GET /api/teams - Returns top Dota 2 teams from OpenDota

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ success: false, error: 'Method not allowed' });

  try {
    const response = await fetch('https://api.opendota.com/api/teams');
    if (!response.ok) throw new Error(`OpenDota API returned ${response.status}`);

    const teams = await response.json();
    const filteredTeams = teams
      .filter(t => t.rating > 0)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 50);

    return res.status(200).json({
      success: true,
      count: filteredTeams.length,
      teams: filteredTeams
    });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
