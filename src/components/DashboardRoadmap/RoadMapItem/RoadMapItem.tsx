import { useSortable } from "@dnd-kit/sortable";
import "./RoadMapItem.scss";
import { CSS } from '@dnd-kit/utilities';

type RoadMapItemProps = {
  id: string;
}

export const RoadMapItem = ({ id }: RoadMapItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px',
    border: '1px solid #ccc',
    marginBottom: '4px',
    background: 'white',
    cursor: 'grab'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  );
};