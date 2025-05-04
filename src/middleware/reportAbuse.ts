import AbuseReport from '@/model/reportAbuse';

export async function reportAbuse(message: string, ip: string) {
  await AbuseReport.create({
    message,
    ip,
    reason: 'Detected as spam',
  });
}
