import React, { useState } from 'react';
import { INVENTORY_ITEMS } from '../../data/mockData';
import { Package, Cpu, ShoppingCart, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Box } from 'lucide-react';

export const EquipmentInventory: React.FC = () => {
  const [items, setItems] = useState(INVENTORY_ITEMS);
  const [poNotice, setPoNotice] = useState<string | null>(null);

  const handleOrderSpare = (sku: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.sku === sku) {
          return { ...item, stock: item.stock + 5, deficit: 'Order Dispatched', status: 'PO En Route' };
        }
        return item;
      })
    );
    setPoNotice(`Electronic Purchase Order issued to vendor for ${sku}. Delivery expected within 4 hours.`);
    setTimeout(() => setPoNotice(null), 4000);
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-700 text-white flex items-center justify-center shadow-xs">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 font-display">
              Equipment Registry & Spare Parts Inventory
            </h1>
            <p className="text-xs text-slate-500">
              Campus asset lifecycles, critical stock thresholds, and automated vendor purchase orders.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-500">Central Stores:</span>
          <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
            Depot Bay 1-4 Active
          </span>
        </div>
      </div>

      {poNotice && (
        <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>{poNotice}</span>
        </div>
      )}

      {/* Critical Items Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-700" />
            <h2 className="text-sm font-bold text-slate-900 font-display">
              High-Priority Critical Spare Components
            </h2>
          </div>
          <span className="font-mono text-[10px] text-slate-400">Real-Time Inventory Mesh</span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-200 font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                <th className="px-5 py-3 font-semibold">SKU & Item Name</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Bay Location</th>
                <th className="px-5 py-3 font-semibold">Stock / Safety Min</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Supplier</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.sku} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{item.name}</span>
                      <span className="font-mono text-[10px] text-slate-400">{item.sku}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-600 font-medium">
                    {item.category}
                  </td>

                  <td className="px-5 py-4 font-mono text-[11px] text-slate-700">
                    {item.bayLocation}
                  </td>

                  <td className="px-5 py-4 font-mono text-xs">
                    <span className="font-bold text-slate-900">{item.stock}</span>
                    <span className="text-slate-400 ml-1">/ min {item.safetyMin}</span>
                  </td>

                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      item.status.includes('Critical') ? 'bg-red-50 text-red-700 border border-red-200' :
                      item.status.includes('Warning') ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                      item.status.includes('En Route') ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                      'bg-teal-50 text-teal-800 border border-teal-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        item.status.includes('Critical') ? 'bg-red-600' :
                        item.status.includes('Warning') ? 'bg-amber-500' :
                        'bg-teal-600'
                      }`}></span>
                      {item.status} ({item.deficit})
                    </span>
                  </td>

                  <td className="px-5 py-4 text-slate-600 text-[11px]">
                    {item.supplier}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => handleOrderSpare(item.sku)}
                      className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors shadow-2xs inline-flex items-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Auto-PO</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
