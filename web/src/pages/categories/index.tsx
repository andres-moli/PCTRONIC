import { useState } from "react";
import Card from "../../components/cards/Card";
import MainLayout from "../../layouts/mainLayouts/mainLayouts";
import RegisterCategoriesModal from "../../components/modals/modal-categories/modal-add-categories";
import CategoriesTable from "../../components/categories/tables/categorie-table";

const CategoriePage: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <MainLayout>
      <div className="space-y-4">
        <Card className="w-50 md:w-30 lg:w-50">
          <div className="flex justify-between items-center">
            <h1>Categorias</h1>
            <button
              onClick={openRegisterModal}
              type="button"
              className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
              + Add
            </button>
          </div>
        </Card>
        <Card className="w-50 md:w-30 lg:w-50">
                <CategoriesTable/>
        </Card>
      </div>
      <RegisterCategoriesModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
      />
    </MainLayout>
  );
};

export default CategoriePage;
