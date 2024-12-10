export default async function(endpoint: string, { method, body }: { method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: { [key: string]: string } }) {
try {
  const response = await fetch('http://localhost:4000/${endpoint}', {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`
    },
    ...body && { body: JSON.stringify(body) }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
} catch {
  return null
}
}