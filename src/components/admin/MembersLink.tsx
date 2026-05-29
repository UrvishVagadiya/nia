import React from "react";

interface MembersLinkProps {
  rowData: { id: string };
}

const MembersLink: React.FC<MembersLinkProps> = ({ rowData }) => {
  const chapterId = rowData?.id;
  if (!chapterId) return null;
  return (
    <a
      href={`/admin/collections/members?where[chapter][equals]=${chapterId}`}
      className="inline-block px-2.5 py-1.5 bg-[#007bff] text-white rounded text-xs font-medium no-underline hover:bg-[#0069d9] transition-colors"
    >
      View Members
    </a>
  );
};

export default MembersLink;
