
import React from 'react';
import { FolderNode } from '../types';
import { Folder, FileText, ChevronRight, ChevronDown } from 'lucide-react';

interface Props {
  nodes: FolderNode[];
}

const TreeNode: React.FC<{ node: FolderNode; depth: number }> = ({ node, depth }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="ml-4">
      <div 
        className="flex items-center gap-2 py-1 cursor-pointer hover:bg-slate-100 rounded px-2"
        onClick={() => node.type === 'folder' && setIsOpen(!isOpen)}
      >
        {node.type === 'folder' ? (
          <>
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            <Folder size={18} className="text-emerald-500 fill-emerald-500/20" />
          </>
        ) : (
          <>
            <div className="w-[14px]" />
            <FileText size={18} className="text-slate-400" />
          </>
        )}
        <span className="font-medium text-sm">{node.name}</span>
        {node.description && (
          <span className="text-xs text-slate-400 font-normal italic">
            — {node.description}
          </span>
        )}
      </div>
      {isOpen && node.children && (
        <div className="border-l border-slate-200 ml-2">
          {node.children.map((child, i) => (
            <TreeNode key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const ArchitectureView: React.FC<Props> = ({ nodes }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm overflow-hidden">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Folder className="text-emerald-600" />
        Flutter 프로젝트 폴더 구조
      </h3>
      <div className="font-mono text-slate-700">
        {nodes.map((node, i) => (
          <TreeNode key={i} node={node} depth={0} />
        ))}
      </div>
    </div>
  );
};
