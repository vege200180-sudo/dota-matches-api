export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  return res.status(200).json({
    status: 'ok',
    service: 'Dota 2 Matches API',
    endpoints: { matches: '/api/matches', teams: '/api/teams' }
  });
}
