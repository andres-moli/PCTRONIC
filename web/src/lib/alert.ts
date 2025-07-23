import Swal from "sweetalert2";

export const alertConfirm = async ({
  title = "¿Estás seguro?",
  text = "",
  confirmButtonText = "Sí",
  denyButtonText = "No",
  showCancelButton = true,
}: {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  denyButtonText?: string;
  showCancelButton?: boolean;
} = {}): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    showDenyButton: true,
    showCancelButton,
    confirmButtonText,
    denyButtonText,
  });

  return result.isConfirmed;
};
