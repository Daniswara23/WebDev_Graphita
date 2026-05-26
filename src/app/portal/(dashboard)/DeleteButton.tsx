/*
  DeleteButton.tsx — Tombol hapus dengan konfirmasi (Client Component).
  Dipakai di halaman publikasi, riset, dan toko.
*/

"use client";

interface DeleteButtonProps {
  action: (formData: FormData) => Promise<void>;
  confirmMessage: string;
}

export default function DeleteButton({ action, confirmMessage }: DeleteButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
      style={{ display: "inline" }}
    >
      <button
        type="submit"
        style={{
          padding: "6px 14px",
          background: "rgba(220,38,38,0.1)",
          border: "1px solid rgba(220,38,38,0.3)",
          borderRadius: "6px",
          color: "#fca5a5",
          fontSize: "12px",
          cursor: "pointer",
        }}
      >
        Hapus
      </button>
    </form>
  );
}
