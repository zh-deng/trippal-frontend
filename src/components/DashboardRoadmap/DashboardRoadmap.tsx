import { useState } from "react";
import { RoadmapItem } from "../../types/Roadmap";
import "./DashboardRoadmap.scss";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { RoadMapItem } from "./RoadMapItem/RoadMapItem";

export const DashboardRoadmap = () => {
  const mockItems: RoadmapItem[] = [
    {
      id: 1,
      content: "First Item"
    },
    {
      id: 1,
      content: "Second Item"
    },
    {
      id: 1,
      content: "Third Item"
    },
    {
      id: 1,
      content: "Fourth Item"
    }
  ]

  const [items, setItems] = useState<string[]>(['Video 1', 'Video 2', 'Video 3', 'Video 4']);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };


	return (
    <div className="dashboard-roadmap">
      <div className="roadmap-header">
        TEST
      </div>
      <div className="roadmap-content">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => (
            <RoadMapItem key={id} id={id} />
          ))}
        </SortableContext>
            </DndContext>
      </div>
    </div>
  );
};
