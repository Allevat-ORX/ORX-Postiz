'use client';

import React, { FC, useState, useMemo } from 'react';
import { useSettings } from '@gitroom/frontend/components/launches/helpers/use.values';

export interface GroupItem {
  id: string;
  nombre: string;
  ciudad: 'SLP' | 'QRO';
  url: string;
}

export const ALL_GROUPS: GroupItem[] = [
  {"id":"arturo-slp-001","nombre":"CONSTRUCTORES POTOSINOS","ciudad":"SLP","url":"https://www.facebook.com/groups/constructores.potosinos/"},
  {"id":"arturo-slp-002","nombre":"CONSTRUCTORES POTOSINOS SLP","ciudad":"SLP","url":"https://www.facebook.com/groups/937269305040863/"},
  {"id":"arturo-slp-003","nombre":"Especialistas de la construcción arquitectos slp","ciudad":"SLP","url":"https://www.facebook.com/groups/500149813497043/"},
  {"id":"arturo-slp-004","nombre":"Contratistas constructoras y servicios para construcción en San luis potosi","ciudad":"SLP","url":"https://www.facebook.com/groups/973021686464405/"},
  {"id":"arturo-slp-005","nombre":"TODO PARA LA CONSTRUCCIÓN SAN LUIS POTOSI","ciudad":"SLP","url":"https://www.facebook.com/groups/745847842148335/"},
  {"id":"arturo-slp-006","nombre":"CONSTRUCTORAS, CONTRATISTAS Y PROVEDORES DE SAN LUIS POTOSI","ciudad":"SLP","url":"https://www.facebook.com/groups/312948407788487/"},
  {"id":"arturo-slp-007","nombre":"Constructores y Maestros de Obra en San Luis Potosí","ciudad":"SLP","url":"https://www.facebook.com/groups/737917374680527/"},
  {"id":"arturo-slp-008","nombre":"Constructores en San Luis Potosí","ciudad":"SLP","url":"https://www.facebook.com/groups/2618287678251447/"},
  {"id":"arturo-slp-009","nombre":"DECORACION Y CONSTRUCCION SAN LUIS POTOSI & BAJIO","ciudad":"SLP","url":"https://www.facebook.com/groups/837939613083365/"},
  {"id":"arturo-slp-010","nombre":"SERVICIOS DE CONSTRUCCIÓN Y RENTA DE MAQUINARIA PESADA EN S.L.P","ciudad":"SLP","url":"https://www.facebook.com/groups/2711522792226720/"},
  {"id":"arturo-slp-011","nombre":"Albañiles SLP, MX (Pozos, Zona industrial)","ciudad":"SLP","url":"https://www.facebook.com/groups/1040559480555457/"},
  {"id":"arturo-slp-012","nombre":"🧱🪨 ALBAÑILES Y CONSTRUCCIÓN SAN LUIS POTOSÍ 🧱🪨","ciudad":"SLP","url":"https://www.facebook.com/groups/321149742862881/"},
  {"id":"arturo-slp-013","nombre":"ALBAÑILES, PLOMEROS Y ELECTRICISTAS DE SAN LUIS POTOSI","ciudad":"SLP","url":"https://www.facebook.com/groups/1007181680320254/"},
  {"id":"arturo-slp-014","nombre":"ALBAÑILES albañilería SAN LUIS POTOSI MX","ciudad":"SLP","url":"https://www.facebook.com/groups/510296508660521/"},
  {"id":"arturo-slp-015","nombre":"Todo en albañilería SLP","ciudad":"SLP","url":"https://www.facebook.com/groups/769439961071992/"},
  {"id":"arturo-slp-016","nombre":"Albañiles San Luis Potosi, S.L.P","ciudad":"SLP","url":"https://www.facebook.com/groups/255115832107479/"},
  {"id":"arturo-slp-017","nombre":"Albañiles de la capital de san luis potosi","ciudad":"SLP","url":"https://www.facebook.com/groups/287635760160993/"},
  {"id":"arturo-slp-018","nombre":"albañiles yeseros vitropiseros plomeros electricistas tablaroca en SLP","ciudad":"SLP","url":"https://www.facebook.com/groups/299149654820308/"},
  {"id":"arturo-slp-019","nombre":"Albañilería en general SLP","ciudad":"SLP","url":"https://www.facebook.com/groups/469610033708801/"},
  {"id":"arturo-slp-020","nombre":"albañiles albañilería en San Luis Potosí 2","ciudad":"SLP","url":"https://www.facebook.com/groups/957146002598489/"},
  {"id":"arturo-slp-021","nombre":"Herramientas Nuevas Y Usadas San Luis Potosi","ciudad":"SLP","url":"https://www.facebook.com/groups/350761338440248/"},
  {"id":"arturo-slp-022","nombre":"Albañilería y constructores San Luis Río Colorado","ciudad":"SLP","url":"https://www.facebook.com/groups/1494684011911090/"},
  {"id":"arturo-slp-023","nombre":"BOLSA DE TRABAJO ARQUITECTOS E INGENIEROS DE SAN LUIS POTOSÍ","ciudad":"SLP","url":"https://www.facebook.com/groups/2214778298684717/"},
  {"id":"arturo-slp-024","nombre":"Maquinaria ligera y Maquinaria Pesada en San Luis Potosí","ciudad":"SLP","url":"https://www.facebook.com/groups/721277314044164/"},
  {"id":"arturo-slp-025","nombre":"VENTA MAQUINARIA INDUSTRIAL SAN LUIS POTOSI","ciudad":"SLP","url":"https://www.facebook.com/groups/576954209564809/"},
  {"id":"arturo-slp-026","nombre":"Retroexcavadoras venta San Luis Potosí","ciudad":"SLP","url":"https://www.facebook.com/groups/6042582549108468/"},
  {"id":"arturo-slp-027","nombre":"Renta de maquinaria pesada en san Luis Potosí","ciudad":"SLP","url":"https://www.facebook.com/groups/455496801516651/"},
  {"id":"arturo-slp-028","nombre":"Tracto Camiones Y Maquinaria En Venta S.L.P","ciudad":"SLP","url":"https://www.facebook.com/groups/187489288395313/"},
  {"id":"arturo-slp-029","nombre":"operadores de maquinaria pesada San Luis Potosí","ciudad":"SLP","url":"https://www.facebook.com/groups/790861457667109/"},
  {"id":"arturo-qro-030","nombre":"Contratistas y Proveedores de Construcción en Querétaro","ciudad":"QRO","url":"https://www.facebook.com/groups/200897843873835/"},
  {"id":"arturo-qro-031","nombre":"Contratistas y constructoras en Queretaro","ciudad":"QRO","url":"https://www.facebook.com/groups/674933729314377/"},
  {"id":"arturo-qro-032","nombre":"Contratistas y constructoras en Querétaro (2)","ciudad":"QRO","url":"https://www.facebook.com/groups/276979315382481/"},
  {"id":"arturo-qro-033","nombre":"Contratistas Querétaro","ciudad":"QRO","url":"https://www.facebook.com/groups/1351662715953518/"},
  {"id":"arturo-qro-034","nombre":"CONTRATISTAS QUERÉTARO","ciudad":"QRO","url":"https://www.facebook.com/groups/2768116033406185/"},
  {"id":"arturo-qro-035","nombre":"Constructoras Querétaro","ciudad":"QRO","url":"https://www.facebook.com/groups/977934952260876/"},
  {"id":"arturo-qro-036","nombre":"Contratistas constructoras y servicios en queretaro San Juan del Río","ciudad":"QRO","url":"https://www.facebook.com/groups/912187995658737/"},
  {"id":"arturo-qro-037","nombre":"Busco contratista constructor Querétaro","ciudad":"QRO","url":"https://www.facebook.com/groups/672970477445704/"},
  {"id":"arturo-qro-038","nombre":"Proveedores para la Construcción Querétaro y Bajío","ciudad":"QRO","url":"https://www.facebook.com/groups/1431284923744088/"},
  {"id":"arturo-qro-039","nombre":"CONSTRUCCIONES EN QUERÉTARO","ciudad":"QRO","url":"https://www.facebook.com/groups/547878884037408/"},
  {"id":"arturo-qro-040","nombre":"Construcción Querétaro Mano de Obra","ciudad":"QRO","url":"https://www.facebook.com/groups/408128887677766/"},
  {"id":"arturo-qro-041","nombre":"AQUI . ANUNCIOS DE CONSTRUCCION EN QUERETARO","ciudad":"QRO","url":"https://www.facebook.com/groups/732485743532715/"},
  {"id":"arturo-qro-042","nombre":"ARQUITECTURA Y CONSTRUCCION EN QUERETARO","ciudad":"QRO","url":"https://www.facebook.com/groups/1721308117898830/"},
  {"id":"arturo-qro-043","nombre":"Querétaro en Construcción","ciudad":"QRO","url":"https://www.facebook.com/groups/147364429546252/"},
  {"id":"arturo-qro-044","nombre":"Construcciones remodelaciones y mantenimiento Querétaro","ciudad":"QRO","url":"https://www.facebook.com/groups/680668735614676/"},
  {"id":"arturo-qro-045","nombre":"Construcciones y remodelaciones todo Querétaro","ciudad":"QRO","url":"https://www.facebook.com/groups/1445439779684388/"},
  {"id":"arturo-qro-046","nombre":"Trabajos de construcción y remodelación querétaro","ciudad":"QRO","url":"https://www.facebook.com/groups/2477777215784292/"},
  {"id":"arturo-qro-047","nombre":"Ingenieros arquitectos .constructoras de queretaro","ciudad":"QRO","url":"https://www.facebook.com/groups/277039926173238/"},
  {"id":"arturo-qro-048","nombre":"Arquitectos Querétaro","ciudad":"QRO","url":"https://www.facebook.com/groups/1507535362654226/"},
  {"id":"arturo-qro-049","nombre":"ARQUITECTOS DEL EDO. DE QRO.","ciudad":"QRO","url":"https://www.facebook.com/groups/163632553693533/"},
  {"id":"arturo-qro-050","nombre":"COMUNIDAD ARQUITECTOS QUERETANOS","ciudad":"QRO","url":"https://www.facebook.com/groups/233688856693775/"},
  {"id":"arturo-qro-051","nombre":"Venta de materiales y servicios para construccion Queretaro","ciudad":"QRO","url":"https://www.facebook.com/groups/544274662422054/"},
  {"id":"arturo-qro-052","nombre":"Materiales para la construccion y mas queretaro","ciudad":"QRO","url":"https://www.facebook.com/groups/545827909097577/"},
  {"id":"arturo-qro-053","nombre":"En CONSTRUCCION Querétaro","ciudad":"QRO","url":"https://www.facebook.com/groups/1653107144935461/"},
  {"id":"arturo-qro-054","nombre":"CONSTRUCCIÓN QUERETARO","ciudad":"QRO","url":"https://www.facebook.com/groups/1891194915106088/"},
  {"id":"arturo-qro-055","nombre":"todo de construcción Querétaro","ciudad":"QRO","url":"https://www.facebook.com/groups/709124909516117/"},
  {"id":"arturo-qro-056","nombre":"TODO PARA LA CONSTRUCCIÓN QUERETARO","ciudad":"QRO","url":"https://www.facebook.com/groups/589736724525254/"},
  {"id":"arturo-qro-057","nombre":"albañilería en general Querétaro","ciudad":"QRO","url":"https://www.facebook.com/groups/470442960736383/"},
  {"id":"arturo-qro-058","nombre":"Mano de Obra en Querétaro","ciudad":"QRO","url":"https://www.facebook.com/groups/165222113212446/"},
  {"id":"arturo-qro-059","nombre":"Compra y venta de maquinaria y tractores agricolas en QUERETARO","ciudad":"QRO","url":"https://www.facebook.com/groups/1602576603370740/"},
  {"id":"arturo-qro-060","nombre":"VENTA, RENTA y REPARACIÓN de MAQUINARIA PESADA en QUERÉTARO y BAJIO de MX","ciudad":"QRO","url":"https://www.facebook.com/groups/3744304062498125/"},
  {"id":"arturo-qro-061","nombre":"VENTA DE MAQUINARIA PESADA EN QUERETARO","ciudad":"QRO","url":"https://www.facebook.com/groups/542946037456921/"},
  {"id":"arturo-qro-062","nombre":"Operadores de maquinaria pesada de Queretaro","ciudad":"QRO","url":"https://www.facebook.com/groups/1567272216904571/"},
  {"id":"arturo-qro-063","nombre":"Compra y venta de maquinaria pesada en guanajuato queretaro y alrededores","ciudad":"QRO","url":"https://www.facebook.com/groups/686269006184760/"}
];

export const FacebookGroupsSelect: FC = () => {
  const form = useSettings();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'SLP' | 'QRO'>('ALL');

  // Valores observados del formulario
  const selectedGroups: string[] = form.watch('selected_groups') || [];

  const handleToggle = (url: string) => {
    const current = form.getValues('selected_groups') || [];
    if (current.includes(url)) {
      form.setValue('selected_groups', current.filter((u: string) => u !== url), { shouldValidate: true });
    } else {
      form.setValue('selected_groups', [...current, url], { shouldValidate: true });
    }
  };

  const handleSelectAll = (ciudad?: 'SLP' | 'QRO') => {
    let targets = ALL_GROUPS;
    if (ciudad) {
      targets = ALL_GROUPS.filter((g) => g.ciudad === ciudad);
    }
    const current = form.getValues('selected_groups') || [];
    const targetUrls = targets.map((g) => g.url);
    const merged = Array.from(new Set([...current, ...targetUrls]));
    form.setValue('selected_groups', merged, { shouldValidate: true });
  };

  const handleClear = () => {
    form.setValue('selected_groups', [], { shouldValidate: true });
  };

  const filteredGroups = useMemo(() => {
    return ALL_GROUPS.filter((g) => {
      const matchCity = activeTab === 'ALL' || g.ciudad === activeTab;
      const matchSearch =
        searchTerm.trim() === '' ||
        g.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.ciudad.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCity && matchSearch;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="w-full flex flex-col gap-3 p-4 bg-[#1f2937]/30 border border-gray-700 rounded-xl my-2">
      {/* Encabezado y Contador */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <span>👥</span> Destinos en Grupos de Facebook
          </h4>
          <p className="text-xs text-gray-400">
            Selecciona a qué comunidades de constructores y contratistas se enviará este post.
          </p>
        </div>
        <div className="text-xs px-2.5 py-1 rounded-full font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
          📍 {selectedGroups.length} seleccionados
        </div>
      </div>

      {/* Botones de acción rápida */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <button
          type="button"
          onClick={() => handleSelectAll('SLP')}
          className="text-xs px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-600 rounded-md transition"
        >
          ✓ Todos SLP (29)
        </button>
        <button
          type="button"
          onClick={() => handleSelectAll('QRO')}
          className="text-xs px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-600 rounded-md transition"
        >
          ✓ Todos QRO (34)
        </button>
        <button
          type="button"
          onClick={() => handleSelectAll()}
          className="text-xs px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md transition"
        >
          ✓ Los 63 Grupos
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="text-xs px-2.5 py-1 bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 rounded-md transition ml-auto"
        >
          ✕ Limpiar
        </button>
      </div>

      {/* Buscador y Tabs */}
      <div className="flex items-center gap-2 mt-1">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre o palabra clave..."
          className="flex-1 bg-gray-900 border border-gray-700 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500"
        />
        <div className="flex bg-gray-900 rounded-lg p-0.5 border border-gray-700 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('ALL')}
            className={`px-2 py-1 rounded ${activeTab === 'ALL' ? 'bg-gray-700 text-white font-medium' : 'text-gray-400'}`}
          >
            Todos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('SLP')}
            className={`px-2 py-1 rounded ${activeTab === 'SLP' ? 'bg-gray-700 text-white font-medium' : 'text-gray-400'}`}
          >
            SLP
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('QRO')}
            className={`px-2 py-1 rounded ${activeTab === 'QRO' ? 'bg-gray-700 text-white font-medium' : 'text-gray-400'}`}
          >
            QRO
          </button>
        </div>
      </div>

      {/* Lista scrollable de grupos con checkboxes */}
      <div className="max-h-56 overflow-y-auto space-y-1 pr-1 custom-scrollbar border border-gray-800 rounded-lg p-1.5 bg-gray-950/40">
        {filteredGroups.length === 0 ? (
          <div className="text-center py-4 text-xs text-gray-500">
            No se encontraron grupos que coincidan con la búsqueda.
          </div>
        ) : (
          filteredGroups.map((group) => {
            const isSelected = selectedGroups.includes(group.url);
            return (
              <label
                key={group.id}
                className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition select-none text-xs ${
                  isSelected
                    ? 'bg-blue-600/15 border border-blue-500/40 text-white'
                    : 'hover:bg-gray-800/60 border border-transparent text-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggle(group.url)}
                  className="rounded border-gray-600 text-blue-600 focus:ring-0 cursor-pointer"
                />
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    group.ciudad === 'SLP'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {group.ciudad}
                </span>
                <span className="flex-1 truncate font-medium">{group.nombre}</span>
                <a
                  href={group.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-500 hover:text-gray-300 text-[10px] underline ml-1"
                >
                  Ver ↗
                </a>
              </label>
            );
          })
        )}
      </div>

      {selectedGroups.length === 0 && (
        <div className="text-[11px] text-amber-400 font-medium">
          ⚠️ Recuerda seleccionar al menos un grupo para programar este envío.
        </div>
      )}
    </div>
  );
};
