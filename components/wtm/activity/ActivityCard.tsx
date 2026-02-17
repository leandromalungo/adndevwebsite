import React from "react";
import { Activity } from "@/data/types";
import Badge from "@/components/wtm/activity/Badge";
import { ThinArrowRight } from "@/components/wtm/activity/constants";

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <div className="bg-white rounded-[15px] border border-gray-100 shadow-sm flex flex-col h-[520px] overflow-hidden group transition-all duration-300 hover:shadow-md">
      {/* Image Section */}
      <div className="relative h-[160px] sm:h-[200px] md:h-[220px] overflow-hidden">
        <img
          src={activity.imageUrl}
          alt={activity.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 lg:p-8 flex flex-col flex-grow h-full">
        {/* Badges and Year */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {activity.types.map((type, idx) => (
              <Badge key={`${activity.id}-${type}-${idx}`} type={type} />
            ))}
          </div>
          <span className="text-gray-300 font-bold text-[13px] tracking-wider">
            {activity.year}
          </span>
        </div>

        {/* Title, Description and Location */}
        <div className="flex-grow flex flex-col h-full">
          <h3 className="text-[#001A72] text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[1.2] mb-3 group-hover:text-blue-900 transition-colors">
            {activity.title}
          </h3>

          <p className="text-gray-500 text-[13px] sm:text-[14px] leading-relaxed mb-6 line-clamp-3">
            {activity.description}
          </p>

          <p className="mt-auto text-gray-400 font-bold uppercase text-[11px] tracking-[0.25em] mono-font">
            {activity.location}
          </p>
        </div>
            <span className="text-[9px] text-gray-400">
              Fonte: este evento tem as suas fontes devidamente mencionadas nesta postagem sem nenhuma alteração.
            </span>
        {/* Action Link */}
        <div className="pt-4 border-t border-gray-50 mt-4">
          <a
            href={activity.link}
            className="inline-flex items-center gap-3 group/link transition-all"
          >
            
            <ThinArrowRight className="text-[#00BFFF] w-5 h-5 transition-transform group-hover/link:translate-x-1" />
            <span className="text-[#001A72] font-bold text-[15px]">
              Vê mais aqui
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
