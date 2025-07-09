import React, { useState } from 'react';
import { VisitComent, VisitComentTypeEnum } from '../../../domain/graphql';
import dayjs from 'dayjs';
import MapsComponentOneComment from '../../Maps/mapsOneComent';
import { BsFiles } from 'react-icons/bs';
import { onClickDocument } from '../../../lib/utils';
interface CommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    comments: VisitComent[]
}
const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, comments }) => {
  if (!isOpen) return null;
  const [isCommentMapModalOpen, setIsCommentMapModalOpen] = useState(false);
  const openMapCommentModal = () => setIsCommentMapModalOpen(true);
  const closeMapCommentModal = () => setIsCommentMapModalOpen(false);
  const [visitCommentMap, setVisitCommentMap] = useState<VisitComent>();
  const onOpenMapComent = (visit: VisitComent) => {
    setVisitCommentMap(visit)
    openMapCommentModal()
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[800px] shadow-xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Comentarios</h2>
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="border-b pb-4 hover:shadow-lg transition-shadow duration-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100"
            >
              <div className="mb-2 flex justify-between items-center">
                <span className="font-semibold text-gray-700">{dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm')}</span>
                <span
                  className={`px-2 py-1 text-xs rounded-md ${
                    comment.type === VisitComentTypeEnum.Inicio
                      ? 'bg-green-100 text-green-600'
                      : comment.type === VisitComentTypeEnum.Fin
                      ? 'bg-orange-100 text-red-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {comment.type}
                </span>
              </div>
              <div className="mb-2 text-gray-600">
                <p>{comment.description}</p>
              </div>
              {
                  comment.mocked
                  &&
                  (
                    <span
                    className={`px-2 py-1 text-xs rounded-md bg-orange-100 text-red-600`}
                  >
                    {'Ubicación falsa'}
                  </span>
                  )
                }
              <div className="flex justify-end">
              {
                  comment.file && (
                    <BsFiles className="w-5 h-8 text-gray-500 mr-3 cursor-pointer" 
                    onClick={() => onClickDocument(comment.file?.url || '')}
                    />
                  )
                }
                <button
                  onClick={() => onOpenMapComent(comment)}
                  className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2 focus:ring-4 focus:outline-none transition duration-200"
                >
                  Ver Mapa
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Cerrar
          </button>
        </div>
      </div>
      <MapsComponentOneComment
        isOpen={isCommentMapModalOpen}
        onClose={closeMapCommentModal}
        visitComment={visitCommentMap}
        key={visitCommentMap?.id}
      />
    </div>
  );
};
export default CommentModal