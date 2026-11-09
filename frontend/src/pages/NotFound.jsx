import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';

export default function NotFound() {
  return (
    <PageHeader eyebrow="404" title="Page not found.">
      <p>
        The page you're looking for doesn't exist or has moved.{' '}
        <Link to="/" className="font-bold text-ink underline decoration-accent decoration-2 underline-offset-4">
          Back to home
        </Link>
      </p>
    </PageHeader>
  );
}
