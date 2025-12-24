
import React from 'react';
import { CollectionSchema } from '../types';
import { Database, Table } from 'lucide-react';

interface Props {
  schemas: CollectionSchema[];
}

export const SchemaView: React.FC<Props> = ({ schemas }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Database className="text-blue-600" />
        <h3 className="text-lg font-bold">Firestore 데이터 스키마</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemas.map((schema) => (
          <div key={schema.name} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
              <Table size={16} className="text-slate-500" />
              <span className="font-bold text-slate-700">{schema.name}</span>
            </div>
            <div className="p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-100">
                    <th className="pb-2 font-medium">필드명</th>
                    <th className="pb-2 font-medium">타입</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {schema.fields.map((field) => (
                    <tr key={field.name} className="group">
                      <td className="py-2">
                        <div className="font-medium text-emerald-600">{field.name}</div>
                        <div className="text-[10px] text-slate-400 group-hover:text-slate-600 transition-colors">
                          {field.description}
                        </div>
                      </td>
                      <td className="py-2 font-mono text-slate-500">{field.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
