import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p>Could not find the requested resource.</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Go back home
        </Link>
      </div>
    </div>
  );
}