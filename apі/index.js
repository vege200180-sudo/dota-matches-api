// GET /api - API info and health check

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  return res.status(200).json({
    status: 'ok',
    service: 'Dota 2 Matches API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      matches: { path: '/api/matches', method: 'GET', description: 'Get upcoming matches from Liquipedia' },
      teams: { path: '/api/teams', method: 'GET', description: 'Get top teams from OpenDota' },
      players: { path: '/api/teams/{id}/players', method: 'GET', description: 'Get players for a team' }
    },
    sources: {
      matches: 'https://liquipedia.net/dota2',
      teams: 'https://opendota.com'
    }
  });
}
