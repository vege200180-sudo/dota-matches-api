export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const response = await fetch('https://dota.haglund.dev/v1/matches');
    const matches = await response.json();
    const validMatches = matches.filter(m => 
      m.teams[0]?.name && m.teams[1]?.name && 
      m.teams[0].name !== 'TBD' && m.teams[1].name !== 'TBD'
    );
    return res.status(200).json({ success: true, matches: validMatches });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
