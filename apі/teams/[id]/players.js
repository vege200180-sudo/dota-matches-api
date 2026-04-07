// GET /api/teams/[id]/players - Returns players for a specific team

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ success: false, error: 'Method not allowed' });

  const { id } = req.query;
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ success: false, error: 'Invalid team ID' });
  }

  try {
    const response = await fetch(`https://api.opendota.com/api/teams/${id}/players`);
    if (!response.ok) throw new Error(`OpenDota API returned ${response.status}`);

    const players = await response.json();
    return res.status(200).json({ success: true, teamId: id, players: players });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
