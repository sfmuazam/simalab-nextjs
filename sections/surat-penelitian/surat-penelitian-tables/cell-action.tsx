'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { SuratPenelitian } from '@/lib/data';
import { useState } from 'react';
import ky from 'ky'
import { Modal } from '@/components/ui/modal'
import Link from 'next/link';

interface CellActionProps {
  data: SuratPenelitian;
  onRefresh: () => void
}

export const CellAction: React.FC<CellActionProps> = ({ data, onRefresh }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('')
  const [isModalOpen, setModalOpen] = useState(false);
 

  const onConfirm = async () => {
    setIsLoading(true);
    try {
      const res = await ky.delete(`/api/surat-penelitian/${data.id}`, { retry: { limit: 2 } });
      const response: any = await res.json()

      setOpen(false);
      setModalMessage(response.message)
      setModalOpen(true);
    } catch (error) {
      console.error('Error during deletion:', error);
      setModalMessage('Terjadi kesalahan saat menghapus data.');
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  async function print() {
    setIsLoading(true);
    try {
      const res = await ky(`/api/surat-penelitian/${data.id}/word`, { retry: { limit: 2 } });
      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Surat Penelitian ${data.nim}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Error during print:', error);
      setModalMessage('Terjadi kesalahan saat mencetak surat.');
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isLoading}
      />
      <Modal
        title="Informasi"
        description={modalMessage}
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false)
          onRefresh()
        }}
      />
      <div className="flex gap-2">
        <Link
          href={`/dashboard/surat-penelitian/${data.id}/edit`}>
          <Button className="bg-yellow-300 hover:bg-yellow-400 dark:bg-yellow-600 dark:hover:bg-yellow-700">
            Update
          </Button>
        </Link>

        <Button
          onClick={print}
          className="bg-blue-300 hover:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-800"
          disabled={isLoading}
        >
          Print
        </Button>
        <Button
          onClick={() => setOpen(true)}
          className="bg-red-300 hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-800"
          disabled={isLoading}
        >
          Delete
        </Button>
      </div>
    </>
  );
};

