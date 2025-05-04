export function getClientIp(req: Request): string {
    const forwarded = req.headers.get('x-forwarded-for');
    return forwarded?.split(',')[0] || 'unknown';
  }
  