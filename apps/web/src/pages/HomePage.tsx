import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '@/api/boardApi';

export default function HomePage() {
  const navigate = useNavigate();
  const creating = useRef(false);

  useEffect(() => {
    if (creating.current) return;
    creating.current = true;

    api
      .createBoard()
      .then((board) => navigate(`/board/${board.id}`, { replace: true }))
      .catch(() => {
        creating.current = false;
      });
  }, [navigate]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center font-sans">
      <p className="text-gray-400 font-semibold">Creating your board…</p>
    </main>
  );
}
