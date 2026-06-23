
        function switchView(viewName) {
            document.getElementById('nav-des').classList.remove('active');
            document.getElementById('nav-imp').classList.remove('active');
            
            if(viewName === 'desarrollo') document.getElementById('nav-des').classList.add('active');
            if(viewName === 'implementacion') document.getElementById('nav-imp').classList.add('active');
            
            document.getElementById('view-desarrollo').classList.remove('active');
            document.getElementById('view-implementacion').classList.remove('active');
            
            document.getElementById('view-' + viewName).classList.add('active');
            
            const titleEl = document.getElementById('main-title');
            const subEl = document.getElementById('main-subtitle');
            
            if(viewName === 'desarrollo') {
                titleEl.textContent = 'Gantt de Desarrollo — TIDEO OPERA';
                subEl.textContent = 'Cliente: ZAHORY · 04 de Mayo – 14 de Junio 2026 · 6 semanas · 139 actividades';
                if (window.renderGanttDev) window.renderGanttDev(); 
            } else {
                titleEl.textContent = 'Gantt de Implementación — TIDEO OPERA';
                subEl.textContent = 'Cliente: ZAHORY · 15 de Junio – 9 de Agosto 2026 · 8 semanas · 123 actividades';
                if (window.renderGanttImp) window.renderGanttImp();
            }
        }

        const devModule = (function() {
            
        // weeks array: [S1, S2, S3, S4, S5, S6]
        // index:        0   1   2   3   4   5
        const WK_LABELS = [
            'S1 · 04–10 May', 'S2 · 11–17 May', 'S3 · 18–24 May',
            'S4 · 25–31 May', 'S5 · 01–07 Jun', 'S6 · 08–14 Jun'
        ];
        const WK_CLS = ['wk-s1', 'wk-s2', 'wk-s3', 'wk-s4', 'wk-s5', 'wk-s6'];
        const TYPE_LABELS = {
            ADM: 'ERP Administrativo', OP: 'ERP Operativo',
            FIX: 'Corrección técnica', AUDIT: 'Auditoría / Documentación', HITO: 'Hito de cierre'
        };

        const SECTIONS = {
            SEC_BASE: { label: '— BASE DEL SISTEMA · PLATAFORMA SaaS —', cls: '' },
            SEC_CRM: { label: '— CRM Y MÓDULOS COMERCIALES —', cls: '' },
            SEC_FIN1: { label: '— FINANZAS Y OPERACIONES BASE —', cls: '' },
            SEC_ROLES: { label: '— ROLES, PERMISOS Y SEGURIDAD —', cls: '' },
            SEC_CRM2: { label: '— CRM CON PERSISTENCIA REAL —', cls: '' },
            SEC_API: { label: '— INTEGRACIONES Y RRHH BASE —', cls: '' },
            SEC_NOM: { label: '— MOTOR DE NÓMINA PERÚ —', cls: '' },
            SEC_RRHH: { label: '— RRHH CORE: EVALUACIÓN, CESE Y TAREO —', cls: '' },
            SEC_COMP: { label: '— COMPRAS DE EXTREMO A EXTREMO —', cls: '' },
            SEC_WMS: { label: '— INVENTARIO, TRANSPORTE Y FINANZAS AVANZADAS —', cls: '' },
            SEC_OP1: { label: '— ERP OPERATIVO · INVESTIGACIÓN Y FASE 1 (13 pantallas) —', cls: 'sec-op' },
            SEC_RRHH2: { label: '— RRHH OLAS 2–5 · BIOMÉTRICO · GEOCERCAS —', cls: '' },
            SEC_MOBILE: { label: '— APP MÓVIL DE CAMPO —', cls: '' },
            SEC_OP2: { label: '— ERP OPERATIVO · FASES 2–4 (22 pantallas) —', cls: 'sec-op' },
            SEC_NOM2: { label: '— NÓMINA FASES 2–3 · CONTRATOS DIGITALES —', cls: '' },
            SEC_OP3: { label: '— ERP OPERATIVO · FASE 5: CAMPO, TRANSPORTE Y HSE (9 pantallas) —', cls: 'sec-op' },
            SEC_AUDIT: { label: '— AUDITORÍAS TÉCNICAS Y VALIDACIÓN INICIAL CON USUARIOS —', cls: 'sec-audit' },
        };

        const ROWS = [
            // ── SEMANA 1 (04–10 May) ──────────────────────────────────────────────────
            { section: 'SEC_BASE' },
            { id: 1, label: 'Diseño del modelo de aislamiento de datos entre empresas clientes', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },
            { id: 2, label: 'Alta de empresas desde panel Superadmin con creación de administrador inicial (migr. 019)', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },
            { id: 3, label: 'Niveles de acceso: Superadmin TIDEO, Administrador de empresa, Usuario, Usuario de campo', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },
            { id: 4, label: 'Bypass global Superadmin en seguridad de datos — acceso a cualquier pantalla de cualquier empresa (migr. 021–022)', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },
            { id: 5, label: 'Pantalla Empresas / Tenants con métricas operativas reales desde base de datos', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },

            { section: 'SEC_CRM' },
            { id: 6, label: 'Hoja de Costeo: borrador → revisión → aprobada → cotización pre-rellenada con versionado (migr. 020, 023)', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },
            { id: 7, label: 'Agenda Comercial: vistas mes/semana/día/lista; evento realizado genera Actividad automática vinculada al cliente (migr. 016)', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },
            { id: 8, label: 'Actividades Comerciales: tablero Kanban con persistencia de estado (migr. 017)', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },
            { id: 9, label: 'Pipeline: historial completo por oportunidad con navegación directa a agenda, actividades, hoja de costeo', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },
            { id: 10, label: 'Hardening de seguridad en todas las tablas CRM + Comercial (migr. 018)', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },

            { section: 'SEC_FIN1' },
            { id: 11, label: 'Flujo de cliente definido: Lead → Cuenta → Contacto → Oportunidad (Lead siempre primero)', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },
            { id: 12, label: 'Formulario de Lead con RUC, Razón Social e Industria; Proveedores con ciclo de vida (Potencial → Homologado → Bloqueado)', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },
            { id: 13, label: 'Módulo Financiamiento y Deuda: amortización automática, intereses al Estado de Resultados, reporte de deuda a 12 meses', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },
            { id: 14, label: 'Nómina Básica base: AFP/ONP, IR 5ta, cargas empresa, boleta PDF, cierre de período con egreso en finanzas', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },
            { id: 15, label: 'Wiring de 13 rutas del sistema: BI Financiero, Dashboard, CS 360°, RRHH Admin, Planner, IA, Presupuesto vs Real, Tickets', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },
            { id: 16, label: 'BI Comercial, BI Operativo y BI Financiero completos', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },
            { id: 17, label: 'Customer Success completo: Onboarding, Planes de Éxito, Health Score, Renovaciones, NPS', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },
            { id: 18, label: 'Inteligencia Artificial: IA Comercial, IA Operativa e IA Financiera con historial auditado', type: 'ADM', weeks: [1, 0, 0, 0, 0, 0] },
            { id: 19, label: 'HITO: Sistema base vivo con 13 rutas activas, CRM y finanzas operativos', type: 'HITO', weeks: [1, 0, 0, 0, 0, 0] },

            // ── SEMANA 2 (11–17 May) ──────────────────────────────────────────────────
            { section: 'SEC_ROLES' },
            { id: 20, label: 'Campo es_plataforma en tabla empresas para identificar al tenant dueño de la plataforma (migr. 062–066)', type: 'ADM', weeks: [0, 1, 0, 0, 0, 0] },
            { id: 21, label: 'Log de auditoría de accesos cruzados entre empresas — registro permanente append-only', type: 'ADM', weeks: [0, 1, 0, 0, 0, 0] },
            { id: 22, label: 'Jerarquía de roles: dirección ve todo el tenant, jefatura ve su equipo, operativo ve solo lo propio (migr. 069)', type: 'ADM', weeks: [0, 1, 0, 0, 0, 0] },
            { id: 23, label: 'UI de Roles: nuevos campos de categoría y nivel jerárquico. UI de Usuarios: jefe directo asignable', type: 'ADM', weeks: [0, 1, 0, 0, 0, 0] },
            { id: 24, label: 'Asignaciones funcionales multirol: una persona en dos áreas simultáneamente (migr. 070)', type: 'ADM', weeks: [0, 1, 0, 0, 0, 0] },

            { section: 'SEC_CRM2' },
            { id: 25, label: 'Historial de estados de leads guardado permanentemente en base de datos (migr. 077–079)', type: 'ADM', weeks: [0, 1, 0, 0, 0, 0] },
            { id: 26, label: 'Historial de movimientos entre etapas del pipeline guardado como registro permanente', type: 'ADM', weeks: [0, 1, 0, 0, 0, 0] },
            { id: 27, label: 'Campañas de Marketing: crear/pausar/reactivar con métricas CPL, ROI, ingresos atribuidos (migr. 068)', type: 'ADM', weeks: [0, 1, 0, 0, 0, 0] },
            { id: 28, label: 'Eliminación de leads con limpieza de datos relacionados en una sola operación (migr. 072–076)', type: 'ADM', weeks: [0, 1, 0, 0, 0, 0] },
            { id: 29, label: 'Responsable comercial propagado correctamente al convertir lead en cuenta y oportunidad', type: 'ADM', weeks: [0, 1, 0, 0, 0, 0] },
            { id: 30, label: 'Panels laterales "Nueva oportunidad" y "Nuevo evento" correctamente conectados a base de datos', type: 'ADM', weeks: [0, 1, 0, 0, 0, 0] },

            { section: 'SEC_API' },
            { id: 31, label: 'Módulo API Keys: claves únicas de integración por empresa con permisos por módulo y acción (migr. 067)', type: 'ADM', weeks: [0, 1, 0, 0, 0, 0] },
            { id: 32, label: 'Función serverless que valida la clave e inserta leads desde sistemas externos (formularios web)', type: 'ADM', weeks: [0, 1, 0, 0, 0, 0] },
            { id: 33, label: 'Módulo Turnos y Horarios completamente conectado: crear/editar/eliminar, horas efectivas en tiempo real, cruza medianoche', type: 'ADM', weeks: [0, 1, 0, 0, 0, 0] },
            { id: 34, label: 'Corrección: import default vs named en rrhhService.js', type: 'FIX', weeks: [0, 1, 0, 0, 0, 0] },
            { id: 35, label: 'Corrección: pages_turnos.jsx correctamente importado en App.jsx, duplicación eliminada', type: 'FIX', weeks: [0, 1, 0, 0, 0, 0] },
            { id: 36, label: 'HITO: CRM con datos reales, roles por jerarquía y módulo de integraciones operativo', type: 'HITO', weeks: [0, 1, 0, 0, 0, 0] },

            // ── SEMANA 3 (18–24 May) ──────────────────────────────────────────────────
            { section: 'SEC_NOM' },
            { id: 37, label: 'AFP: aporte 10% + comisión por flujo % + prima de seguro sobre tope RAM — tres componentes separados', type: 'ADM', weeks: [0, 0, 1, 0, 0, 0] },
            { id: 38, label: 'IR 5ta categoría con UIT configurable por empresa y proyección anual real', type: 'ADM', weeks: [0, 0, 1, 0, 0, 0] },
            { id: 39, label: 'Horas extra: primeras 2 horas del día al 25%, desde la 3ra hora al 35%', type: 'ADM', weeks: [0, 0, 1, 0, 0, 0] },
            { id: 40, label: 'CTS sobre remuneración computable; gratificación y bonificación extraordinaria 9%', type: 'ADM', weeks: [0, 0, 1, 0, 0, 0] },
            { id: 41, label: 'Régimen MYPE: microempresa sin CTS ni gratificación (vacaciones 15 días); pequeña empresa con ambas', type: 'ADM', weeks: [0, 0, 1, 0, 0, 0] },
            { id: 42, label: 'Régimen Minero: ciclos 14+7, 20+10, 28+14; remuneración proporcional; bonificación por altitud (migr. 150)', type: 'ADM', weeks: [0, 0, 1, 0, 0, 0] },
            { id: 43, label: 'Pago quincenal configurable: 1ra quincena sin retenciones; 2da quincena con IR completo y cargas sociales', type: 'ADM', weeks: [0, 0, 1, 0, 0, 0] },
            { id: 44, label: 'Reporte PLAME descargable en Excel por cada período cerrado', type: 'ADM', weeks: [0, 0, 1, 0, 0, 0] },
            { id: 45, label: 'Pantalla de configuración de nómina: régimen, frecuencia de pago, UIT, RMV, RAM, AFP por empresa', type: 'ADM', weeks: [0, 0, 1, 0, 0, 0] },

            { section: 'SEC_RRHH' },
            { id: 46, label: 'Evaluación de Desempeño 360°: plantillas configurables, autoevaluación, evaluación del jefe, scores ponderados (migr. 151)', type: 'ADM', weeks: [0, 0, 1, 0, 0, 0] },
            { id: 47, label: 'Resultados individuales y consolidados de evaluaciones con exportación a Excel', type: 'ADM', weeks: [0, 0, 1, 0, 0, 0] },
            { id: 48, label: 'Liquidación por Cese: todos los tipos de cese, cálculo automático de conceptos, genera CxP automática (migr. 152)', type: 'ADM', weeks: [0, 0, 1, 0, 0, 0] },
            { id: 49, label: 'Personal administrativo puede participar en OT y registrar horas en Parte Diario sin pasar por Planner (migr. 147)', type: 'ADM', weeks: [0, 0, 1, 0, 0, 0] },
            { id: 50, label: 'Tareo Administrativo: registro de horas contra OT o CECO libre, en backoffice y PWA (migr. 148)', type: 'ADM', weeks: [0, 0, 1, 0, 0, 0] },
            { id: 51, label: 'HITO: Motor de nómina laboral peruana completo y módulos de cese operativos', type: 'HITO', weeks: [0, 0, 1, 0, 0, 0] },

            // ── SEMANA 4 (25–31 May) ──────────────────────────────────────────────────
            { section: 'SEC_COMP' },
            { id: 52, label: 'Proveedores: ficha completa con ciclo de vida y homologación; solo homologados reciben Órdenes de Compra', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 53, label: 'Cotizaciones de Compra: asistente de 3 pasos y cuadro comparativo de proveedores', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 54, label: 'Órdenes de Compra: seguimiento por estados, lead time, origen SOLPE, alertas de vencimiento (migr. 215–221)', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 55, label: 'Órdenes de Servicio Interna: para servicios tercerizados con conformidad como cierre', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 56, label: 'Recepciones: verificación ítem por ítem, matching 3 vías, precio histórico; genera CxP + evaluación de proveedor', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 57, label: 'Devoluciones a Proveedor: flujo completo crear/enviar/aceptar con nota de crédito (migr. 232)', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 58, label: 'Compras en Campo / Gastos: extracción IA del comprobante, validación de CECO obligatoria', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },

            { section: 'SEC_WMS' },
            { id: 59, label: 'Inventario y Kardex: tres estados de valuación C1 (nuevo), C2 (recuperado), C3 (dañado) (migr. 214)', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 60, label: 'SOLPE Interna: items trazados hasta la OC, stock de seguridad con SOLPE automática (migr. 234–236)', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 61, label: 'Transporte y Guías de Remisión: 9 tablas nuevas, correlativo SUNAT T001-XXXXXXXX, validación campos obligatorios (migr. 211)', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 62, label: 'Al confirmar entrega actualiza inventario automáticamente; al anular revierte el movimiento', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 63, label: 'Órdenes de Venta: cálculo IGV 18%, reserva/liberación de stock, catálogo vinculado a materiales', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 64, label: 'PDF Guía de Remisión con todos los campos SUNAT (sección OSE_FUTURE reservada)', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 65, label: 'Tarifa hora por colaborador: sueldo mensual ÷ horas base; usada en OTs, partes, tareos y Control de Horas (migr. 170)', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 66, label: 'Activos Fijos: maestro de activos con trazabilidad desde la compra que los originó (migr. 212)', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 67, label: 'Notificaciones internas para vencimiento de documentos (migr. 213)', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 68, label: 'CxP con campos para honorarios 4ta categoría, tipo de cambio, moneda original, OT vinculada, categoría ER (migr. 166–169)', type: 'ADM', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 69, label: 'Corrección: sincronización OV ↔ Guía en confirmarEntrega() y anularGuia()', type: 'FIX', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 70, label: 'Corrección: eliminación de RecepcionesLegacy (código muerto en pages_ops.jsx)', type: 'FIX', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 71, label: 'Corrección: registrarEntradaDesdeRecepcion agrega codigo y material_id al mapeo de items', type: 'FIX', weeks: [0, 0, 0, 1, 0, 0] },

            { section: 'SEC_OP1' },
            { id: 72, label: 'Investigación: levantamiento del flujo operativo de ZAHORY en minería subterránea con equipos LHD Caterpillar', type: 'OP', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 73, label: 'Investigación: mapeo del ciclo completo desde la falla del equipo hasta el cierre y la liquidación al contrato', type: 'OP', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 74, label: 'Investigación: modelo DBS (Tipo de Trabajo × Cargo Financiero) e indicadores de confiabilidad DMR, MTBF, MTTR, OEE', type: 'OP', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 75, label: 'Fase 1: Dashboard Gerencial Operativo con KPIs en tiempo real, alertas e indicadores de flota', type: 'OP', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 76, label: 'Fase 1: Mis OTs del Día — vista mobile-first diferenciada por rol (técnico, supervisor, gerencia)', type: 'OP', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 77, label: 'Fase 1: Panel de Flota y Contratos de Alquiler', type: 'OP', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 78, label: 'Fase 1: Bandeja Maestra de OTs y Creación de OT con modelo DBS y herencia automática de Centro de Costo', type: 'OP', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 79, label: 'Fase 1: Partes de Taller y Cierre con liquidación automática al contrato', type: 'OP', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 80, label: 'Fase 1: Backlog Operativo y Programación de Mantenimiento Preventivo con semáforo de vencimiento', type: 'OP', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 81, label: 'Fase 1: KPIs de Confiabilidad (DMR, MTBF, MTTR, Maintenance Ratio) y Disponibilidad Mecánica vs Meta contractual', type: 'OP', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 82, label: 'Fase 1: Reportes de Campo mobile-first para técnicos en operación minera', type: 'OP', weeks: [0, 0, 0, 1, 0, 0] },
            { id: 83, label: 'HITO: Ciclo de compras E2E completo + 13 pantallas del ERP Operativo construidas', type: 'HITO', weeks: [0, 0, 0, 1, 0, 0] },

            // ── SEMANA 5 (01–07 Jun) ──────────────────────────────────────────────────
            { section: 'SEC_RRHH2' },
            { id: 84, label: 'RRHH Ola 2: datos bancarios, bloqueo de acceso al cese, contratos con tipo y duración, falta grave documentada', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 85, label: 'RRHH Ola 2: autorización de horas extra, compensaciones y descuentos extraordinarios', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 86, label: 'RRHH Ola 3: registro de amonestaciones con notificación y acuse del colaborador', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 87, label: 'RRHH Ola 3: papeletas de movimiento integradas en Solicitudes de RRHH', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 88, label: 'RRHH Ola 4: asistencia para personal honorarios; Roster Minero con snapshots por ciclo y cierre', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 89, label: 'RRHH Ola 5: Reclutamiento — vacantes, candidatos, candidaturas con historial, postulación pública por token', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 90, label: 'RRHH Ola 5: Mi Portal — ficha propia, documentos, solicitudes, boletas con acuse, constancias y amonestaciones', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 91, label: 'Control de Asistencia: integración biométrica, carga y anulación de lotes de marcación (migr. 237)', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 92, label: 'Geocercas: zonas geográficas por colaborador con validación GPS al registrar asistencia', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 93, label: 'Alerta SAR automática cuando un colaborador no registra entrada dentro del turno asignado', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 94, label: 'Notificaciones vía WhatsApp para colaboradores con número y consentimiento registrado', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 95, label: 'Historial de asignaciones de jornada con vigencia; soporte de suspensión perfecta como tramo diferenciado (migr. 206)', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },

            { section: 'SEC_MOBILE' },
            { id: 96, label: 'App móvil — Técnico: OTs del día → GPS → parte diario en 4 pasos → fotos → avance → restricciones', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 97, label: 'App móvil — Comprador: foto de comprobante → extracción por IA → vincular a OT → pendiente revisión', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 98, label: 'App móvil — Supervisor: aprobar partes → mapa de OTs con semáforo de cumplimiento SLA', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 99, label: 'App móvil — Administrativo: registro del día con OTs asignadas y actividades libres por Centro de Costo', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 100, label: 'App móvil — Checklist de seguridad SSOMA y escáner de código de barras', type: 'ADM', weeks: [0, 0, 0, 0, 1, 0] },

            { section: 'SEC_OP2' },
            { id: 101, label: 'Fase 2: Actas y Despachos de equipos con OT de movilización vinculada', type: 'OP', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 102, label: 'Fase 2: Pasaporte de Equipos — historial completo de componentes instalados y retirados por equipo', type: 'OP', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 103, label: 'Fase 2: Gestión de Garantías — ciclo de vida de reclamaciones al fabricante', type: 'OP', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 104, label: 'Fase 2: Certificaciones del Activo — SOAT, pólizas, habilitaciones con semáforo de vencimiento', type: 'OP', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 105, label: 'Fase 2: Catálogo de Repuestos con estados C1/C2/C3 y costo aterrizado (FOB + flete + arancel + IGV)', type: 'OP', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 106, label: 'Fase 2: Cotizaciones y Órdenes de Venta de repuestos', type: 'OP', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 107, label: 'Fase 3: Análisis SOS de aceite — muestra → resultado de laboratorio → generación automática de backlog', type: 'OP', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 108, label: 'Fase 3: KPIs automáticos de Confiabilidad: MTBF, MTTR, DMR y Maintenance Ratio', type: 'OP', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 109, label: 'Fase 3: Liquidación mensual y Disponibilidad Mecánica real vs meta contractual con penalidades', type: 'OP', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 110, label: 'Fase 4: Órdenes de Fabricación con planificación en grilla de 15 días y detección de cuellos de botella', type: 'OP', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 111, label: 'Fase 4: Control de Producción por área: Maestranza, Soldadura, Fabricación y Ensamble', type: 'OP', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 112, label: 'Fase 4: OEE y Rendimiento: Disponibilidad × Rendimiento × Calidad', type: 'OP', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 113, label: 'Fase 4: No Conformidades con bloqueo de liberación, Control de Calidad y Trazabilidad completa de la Orden de Fabricación', type: 'OP', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 114, label: 'Fase 4: Listas de Materiales (BOM) y tiempos estándar por proceso productivo (catálogo MTM)', type: 'OP', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 115, label: 'Fase 4: Supply Chain — Inventario y Kardex operativo, SOLPE, Compras e Importación', type: 'OP', weeks: [0, 0, 0, 0, 1, 0] },
            { id: 116, label: 'Fase 4: Transporte Comercial — Monitor de Viajes, Hoja de Ruta, Maestro de Rutas y Tarifas por zona', type: 'OP', weeks: [0, 0, 0, 0, 1, 0] },

            // ── SEMANA 6 (08–14 Jun) ──────────────────────────────────────────────────
            { section: 'SEC_NOM2' },
            { id: 117, label: 'Nómina Fase 2: historial de asignaciones de jornada — cálculo correcto por tramos dentro de un mismo período', type: 'ADM', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 118, label: 'Nómina Fase 3: afp_parametros multitenant — comisiones flujo/mixta configurables por AFP y empresa (migr. 208)', type: 'ADM', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 119, label: 'Motor de nómina corregido: días esperados por tramo, asistencias nunca superan días esperados del período', type: 'ADM', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 120, label: 'Motor de nómina: régimen Mixto (ej. Minero → General) con etiqueta explícita y cálculo por tramos separados', type: 'ADM', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 121, label: 'Contratos digitales: obligatorio antes de activar al trabajador; firma desde móvil con código OTP de verificación', type: 'ADM', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 122, label: 'Motor de adendas: al modificar cargo o sueldo, el sistema exige subir la adenda vinculada al contrato original', type: 'ADM', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 123, label: 'Versionado de contratos: cada adenda genera un snapshot histórico permanente — contrato como fuente única (migr. 238–248)', type: 'ADM', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 124, label: 'Carga masiva de personal operativo y administrativo desde plantilla Excel con validación previa de datos', type: 'ADM', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 125, label: 'Compras avanzado: seguimiento de OC en tránsito y valorización GRNI (mercadería recibida pendiente de factura)', type: 'ADM', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 126, label: 'Corrección: personalDocumentosService.js — documentos con estado pendiente de validación ahora visibles correctamente', type: 'FIX', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 127, label: 'Corrección: afp_parametros_comisiones (migr. 209) y fix join tipo_documento (migr. 210)', type: 'FIX', weeks: [0, 0, 0, 0, 0, 1] },

            { section: 'SEC_OP3' },
            { id: 128, label: 'Fase 5: Mapa de Campo con ubicación de equipos y órdenes (GPS simulado — real en siguiente fase)', type: 'OP', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 129, label: 'Fase 5: Monitor de Viajes, Hoja de Ruta (asistente 4 pasos), Maestro de Rutas y Tarifas', type: 'OP', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 130, label: 'Fase 5: Scheduler y Despacho — asignación de trabajos por habilidad y zona geográfica', type: 'OP', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 131, label: 'Fase 5: Guías y Despachos de repuestos integrados al flujo completo de venta', type: 'OP', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 132, label: 'Fase 5 HSE: Dashboard HSE y Permisos de Trabajo en Alto Riesgo (PETAR)', type: 'OP', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 133, label: 'Fase 5 HSE: Registro de Incidentes según normativa DS 024-2016-EM', type: 'OP', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 134, label: 'Fase 5 HSE: EPP y Certificaciones del personal con semáforo de vencimiento', type: 'OP', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 135, label: 'Fase 5 HSE: Análisis de Trabajo Seguro (ATS) y Protocolo de Bloqueo y Etiquetado (LOTO)', type: 'OP', weeks: [0, 0, 0, 0, 0, 1] },

            { section: 'SEC_AUDIT' },
            { id: 136, label: 'Auditoría técnica 14/06: cruce de pages_*.jsx, context.jsx, services/*.js y supabase/migrations → 242 migraciones confirmadas', type: 'AUDIT', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 137, label: 'Auditoría técnica 16/06: corte final a 253 migraciones, identificación de implementaciones no documentadas previamente', type: 'AUDIT', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 138, label: 'Validación inicial de pantallas del ERP Administrativo con usuarios de ZAHORY (CRM, RRHH, Compras, Logística, Almacén, Finanzas)', type: 'AUDIT', weeks: [0, 0, 0, 0, 0, 1] },
            { id: 139, label: 'HITO: 48 pantallas ERP Operativo completas · ~74 módulos ERP Administrativo · Validación inicial realizada · Desarrollo cerrado', type: 'HITO', weeks: [0, 0, 0, 0, 0, 1] },
        ];

        // ── BUILD TABLE ────────────────────────────────────────────────────────────
        const collapsedSections = new Set();
        let currentFilter = 'ALL';

        
        
        let allCollapsed = false;
        function toggleAllSections(e) {
            allCollapsed = !allCollapsed;
            
            const table = e.currentTarget.closest('table');
            const icon = e.currentTarget.querySelector('span');
            if(icon) icon.style.transform = allCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
            
            Object.keys(SECTIONS).forEach(key => {
                if (allCollapsed) collapsedSections.add(key);
                else collapsedSections.delete(key);
            });
            
            table.querySelectorAll('tr.row-section, tr.row-sec').forEach(tr => {
                tr.classList.toggle('collapsed', allCollapsed);
            });
            
            applyFilter(currentFilter);
        }

        

        
        function attachToggleToTable(tbody) {
            setTimeout(() => {
                if (!tbody) return;
                const table = tbody.closest('table');
                if (!table) return;
                const btn = table.querySelector('.js-toggle-all');
                if (btn && !btn.dataset.listenerAttached) {
                    btn.addEventListener('click', toggleAllSections);
                    btn.dataset.listenerAttached = 'true';
                }
            }, 50);
        }

        function buildTable() {
            const tbody = document.getElementById('ganttBodyDev');
            tbody.innerHTML = '';
            attachToggleToTable(tbody);
            let currentSection = null;
            const sectionWeeks = {};
            ROWS.forEach(row => {
                if (row.section) {
                    currentSection = row.section;
                    if (!sectionWeeks[currentSection]) sectionWeeks[currentSection] = [];
                } else if (currentSection && row.weeks) {
                    row.weeks.forEach((w, i) => {
                        if (w) sectionWeeks[currentSection][i] = 1;
                    });
                }
            });
            currentSection = null;
            ROWS.forEach(row => {
                if (row.section) {
                    currentSection = row.section;
                    const sec = SECTIONS[row.section];
                    const tr = document.createElement('tr');
                    tr.className = 'row-section ' + (sec.cls || '');
                    tr.dataset.section = row.section;
                    // 3 fixed cols + 6 week cols = 9
                    const tdLabel = document.createElement('td');
                    tdLabel.colSpan = 3;
                    tdLabel.innerHTML = `<span class="sec-toggle">▾</span>${sec.label}`;
                    tr.appendChild(tdLabel);
                    const sWeeks = sectionWeeks[row.section] || [];
                    for (let wi = 0; wi < 6; wi++) {
                        const td = document.createElement('td');
                        td.className = 'cell-week ' + WK_CLS[wi];
                        if (sWeeks[wi]) {
                            const bar = document.createElement('span');
                            bar.className = 'bar bar-INTERN';
                            bar.style.opacity = '0.5';
                            td.appendChild(bar);
                        }
                        tr.appendChild(td);
                    }
                    tr.addEventListener('click', () => toggleSection(row.section));
                    tbody.appendChild(tr);
                    return;
                }
                const isHito = row.type === 'HITO';
                const tr = document.createElement('tr');
                tr.className = isHito ? 'row-hito' : 'row-activity';
                tr.dataset.type = row.type;
                tr.dataset.id = row.id;
                tr.dataset.section = currentSection;

                // num
                const tdN = document.createElement('td');
                tdN.className = 'cell-num';
                tdN.textContent = isHito ? '◆' : row.id;
                tr.appendChild(tdN);

                // label
                const tdL = document.createElement('td');
                tdL.className = 'cell-label' + (isHito ? ' hito-label' : '');
                tdL.textContent = row.label;
                tr.appendChild(tdL);

                // type
                const tdT = document.createElement('td');
                tdT.className = 'cell-type';
                if (!isHito) {
                    const b = document.createElement('span');
                    b.className = `type-badge type-${row.type}`;
                    b.textContent = row.type;
                    tdT.appendChild(b);
                }
                tr.appendChild(tdT);

                // 6 week cells
                row.weeks.forEach((active, wi) => {
                    const td = document.createElement('td');
                    td.className = 'cell-week ' + WK_CLS[wi];
                    if (active) {
                        const bar = document.createElement('span');
                        bar.className = isHito ? 'bar bar-HITO' : `bar bar-${row.type}`;
                        bar.addEventListener('mouseenter', e => showTip(e, row, wi));
                        bar.addEventListener('mousemove', e => moveTip(e));
                        bar.addEventListener('mouseleave', hideTip);
                        td.appendChild(bar);
                    }
                    tr.appendChild(td);
                });

                tbody.appendChild(tr);
            });
        }

        // ── TOOLTIP ───────────────────────────────────────────────────────────────
        const tip = document.getElementById('tooltip');
        const ttT = document.getElementById('tt-type');
        const ttN = document.getElementById('tt-name');
        function showTip(e, row, wi) { ttT.textContent = TYPE_LABELS[row.type] + ' · ' + WK_LABELS[wi]; ttN.textContent = row.label; tip.classList.add('visible'); moveTip(e); }
        function moveTip(e) { let x = e.clientX + 14, y = e.clientY + 14; if (x + 310 > window.innerWidth) x = e.clientX - 314; if (y + 80 > window.innerHeight) y = e.clientY - 80; tip.style.left = x + 'px'; tip.style.top = y + 'px'; }
        function hideTip() { tip.classList.remove('visible'); }

        // ── FILTERS ───────────────────────────────────────────────────────────────
        document.querySelectorAll('#view-desarrollo .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#view-desarrollo .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyFilter(btn.dataset.type);
            });
        });

        function toggleSection(key) {
            if (collapsedSections.has(key)) collapsedSections.delete(key);
            else collapsedSections.add(key);
            document.querySelectorAll(`tr.row-section[data-section="${key}"]`)
                .forEach(tr => tr.classList.toggle('collapsed', collapsedSections.has(key)));
            applyFilter(currentFilter);
        }

        function applyFilter(f) {
            currentFilter = f;
            const rows = document.querySelectorAll('#ganttBodyDev tr');
            let visible = 0;
            rows.forEach(tr => {
                if (tr.classList.contains('row-section')) return;
                const t = tr.dataset.type;
                // HITO rows always show when filter is ALL or HITO; hide for other specific filters
                const match = f === 'ALL'
                    || t === f
                    || (f === 'HITO' && t === 'HITO');
                const collapsed = collapsedSections.has(tr.dataset.section);
                tr.classList.toggle('row-hidden', !match || collapsed);
                if (match && !collapsed) visible++;
            });
            rows.forEach(tr => {
                if (!tr.classList.contains('row-section')) return;
                let next = tr.nextElementSibling, any = false;
                while (next && !next.classList.contains('row-section')) {
                    if (!next.classList.contains('row-hidden')) { any = true; break; }
                    next = next.nextElementSibling;
                }
                const isCollapsed = collapsedSections.has(tr.dataset.section);
                tr.classList.toggle('row-hidden', !any && !isCollapsed);
            });
            document.getElementById('stats-pill-dev').innerHTML = `<strong>${visible}</strong> actividades visibles`;
        }

        buildTable();
        attachToggleListener();

            window.renderGanttDev = function() { buildTable();
        attachToggleListener(); applyFilter(currentFilter); };
        })();

        const impModule = (function() {
            
        // weeks: [S1, S2, S3, S4, S5, S6, S7, S8]
        // index:   0   1   2   3   4   5   6   7
        const WK_LABELS = [
            'S1 · 15–19 Jun', 'S2 · 22–26 Jun', 'S3 · 29 Jun–3 Jul (interna)',
            'S4 · 6–10 Jul', 'S5 · 13–17 Jul',
            'S6 · 20–24 Jul', 'S7 · 27–31 Jul', 'S8 · 3–9 Ago'
        ];
        const WK_CLS = ['wk-adm', 'wk-adm', 'wk-int', 'wk-adm', 'wk-adm', 'wk-op', 'wk-op', 'wk-op'];
        const TYPE_LABELS = {
            CONFIG: 'Configuración', VALID: 'Validación', PERS: 'Personalización',
            CARGA: 'Carga de datos', INTERN: 'Semana interna', HITO: 'Hito de cierre'
        };

        const SECTIONS = {
            SEC_S1_SETUP: { label: '— SEMANA 1: CONFIGURACIÓN INICIAL Y RRHH PARTE 1 —', cls: '' },
            SEC_S2_RRHH: { label: '— SEMANA 2: RRHH PARTE 2 —', cls: '' },
            SEC_S3_INT: { label: '— SEMANA 3: INTERNA — CABLEADO ERP OPERATIVO —', cls: 's-int' },
            SEC_S4_CRM: { label: '— SEMANA 4: CRM, COMERCIAL Y COMPRAS —', cls: '' },
            SEC_S5_FIN: { label: '— SEMANA 5: ADMINISTRACIÓN, FINANZAS Y CIERRE ERP ADMINISTRATIVO —', cls: '' },
            SEC_S6_FLOTA: { label: '— SEMANA 6: FLOTA, TALLER Y CONFIABILIDAD —', cls: 's-op' },
            SEC_S7_PROD: { label: '— SEMANA 7: PRODUCCIÓN, SUPPLY CHAIN Y TRANSPORTE —', cls: 's-op' },
            SEC_S8_HSE: { label: '— SEMANA 8: SEGURIDAD & SALUD + PASE A PRODUCCIÓN FINAL —', cls: 's-op' },
        };

        // weeks array: 8 positions [S1,S2,S3,S4,S5,S6,S7,S8]
        const ROWS = [
            // ── SEMANA 1 (15–19 Jun) ─────────────────────────────────────────────────
            { section: 'SEC_S1_SETUP' },
            { id: 1, label: 'Creación del tenant de ZAHORY en el sistema', type: 'CONFIG', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 2, label: 'Configuración de empresa: razón social, RUC, logo y moneda', type: 'CONFIG', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 3, label: 'Creación de usuarios y contraseñas del equipo ZAHORY', type: 'CONFIG', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 4, label: 'Configuración de roles y permisos por área y cargo', type: 'CONFIG', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 5, label: 'Carga del organigrama y estructura de cargos', type: 'CARGA', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 6, label: 'Configuración de turnos y horarios reales de la empresa', type: 'CONFIG', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 7, label: 'Carga del personal operativo (ficha laboral, régimen, AFP)', type: 'CARGA', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 8, label: 'Carga del personal administrativo (ficha laboral, comisiones)', type: 'CARGA', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 9, label: 'Configuración de parámetros de nómina: UIT, RMV, AFP y régimen laboral', type: 'CONFIG', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 10, label: 'Validación: Reclutamiento (vacantes, candidatos y candidaturas)', type: 'VALID', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 11, label: 'Validación: Personal Operativo — ficha laboral y documentos', type: 'VALID', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 12, label: 'Validación: Personal Administrativo — ficha laboral y documentos', type: 'VALID', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 13, label: 'Validación: Turnos y Horarios', type: 'VALID', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 14, label: 'Validación: Control de Asistencia (diaria, semanal, mensual)', type: 'VALID', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 15, label: 'Validación: Solicitudes de RRHH (vacaciones, permisos, licencias, papeletas)', type: 'VALID', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 16, label: 'Personalización: ajustes de campos y flujos según feedback del cliente', type: 'PERS', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },
            { id: 17, label: 'HITO: Sistema activo y RRHH Parte 1 validado', type: 'HITO', weeks: [1, 0, 0, 0, 0, 0, 0, 0] },

            // ── SEMANA 2 (22–26 Jun) ─────────────────────────────────────────────────
            { section: 'SEC_S2_RRHH' },
            { id: 18, label: 'Carga de datos bancarios de colaboradores', type: 'CARGA', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },
            { id: 19, label: 'Carga y configuración de contratos laborales digitales con firma', type: 'CONFIG', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },
            { id: 20, label: 'Configuración de adendas a contratos existentes', type: 'CONFIG', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },
            { id: 21, label: 'Validación: Nómina — cálculo de prueba con datos reales del cliente', type: 'VALID', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },
            { id: 22, label: 'Validación: Nómina régimen minero (roster, ciclos 14×7 y 20×10)', type: 'VALID', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },
            { id: 23, label: 'Validación: Préstamos al Personal', type: 'VALID', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },
            { id: 24, label: 'Validación: Comisiones y generación de Recibo de Honorarios', type: 'VALID', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },
            { id: 25, label: 'Validación: Liquidación por Cese (prueba con caso real)', type: 'VALID', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },
            { id: 26, label: 'Validación: Evaluación de Desempeño', type: 'VALID', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },
            { id: 27, label: 'Validación: Amonestaciones y Papeletas', type: 'VALID', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },
            { id: 28, label: 'Validación: Roster Minero y Control de Horas', type: 'VALID', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },
            { id: 29, label: 'Validación: Tareo Administrativo (backoffice y app móvil)', type: 'VALID', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },
            { id: 30, label: 'Validación: Mi Portal — autoservicio del colaborador', type: 'VALID', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },
            { id: 31, label: 'Validación: Control de Asistencia — biométrico, geocercas y SAR', type: 'VALID', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },
            { id: 32, label: 'Validación: App Móvil — perfiles técnico, administrativo y supervisor', type: 'VALID', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },
            { id: 33, label: 'Personalización: régimen, ciclos mineros y ajustes de nómina propios del cliente', type: 'PERS', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },
            { id: 34, label: 'HITO: Módulo RRHH completo validado y operativo', type: 'HITO', weeks: [0, 1, 0, 0, 0, 0, 0, 0] },

            // ── SEMANA 3 (29 Jun–3 Jul) — INTERNA ────────────────────────────────────
            { section: 'SEC_S3_INT' },
            { id: 35, label: 'Cableado y conexión de pantallas del ERP Operativo a la base de datos (trabajo interno TIDEO — sin entregable al cliente)', type: 'INTERN', weeks: [0, 0, 1, 0, 0, 0, 0, 0] },

            // ── SEMANA 4 (6–10 Jul) ──────────────────────────────────────────────────
            { section: 'SEC_S4_CRM' },
            { id: 36, label: 'Carga de clientes y contactos existentes', type: 'CARGA', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 37, label: 'Configuración de etapas del proceso comercial propio del cliente', type: 'CONFIG', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 38, label: 'Carga del catálogo de servicios y tarifarios', type: 'CARGA', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 39, label: 'Carga y homologación de proveedores', type: 'CARGA', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 40, label: 'Configuración de almacenes reales del cliente', type: 'CONFIG', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 41, label: 'Validación: Cuentas y Contactos', type: 'VALID', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 42, label: 'Validación: Leads y Pipeline de Oportunidades', type: 'VALID', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 43, label: 'Validación: Agenda Comercial y Actividades', type: 'VALID', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 44, label: 'Validación: Hoja de Costeo y Cotizaciones', type: 'VALID', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 45, label: 'Validación: Órdenes de Servicio al Cliente', type: 'VALID', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 46, label: 'Validación: Campañas de Marketing', type: 'VALID', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 47, label: 'Validación: Proveedores y Cotizaciones de Compra', type: 'VALID', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 48, label: 'Validación: Órdenes de Compra y Recepciones', type: 'VALID', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 49, label: 'Validación: Devoluciones a Proveedor', type: 'VALID', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 50, label: 'Validación: Almacenes, Inventario y SOLPE', type: 'VALID', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 51, label: 'Validación: Compras en Campo y Gastos', type: 'VALID', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 52, label: 'Validación: Transporte y Guías de Remisión', type: 'VALID', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },
            { id: 53, label: 'Personalización: diccionario comercial, etapas y condiciones del cliente', type: 'PERS', weeks: [0, 0, 0, 1, 0, 0, 0, 0] },

            // ── SEMANA 5 (13–17 Jul) ─────────────────────────────────────────────────
            { section: 'SEC_S5_FIN' },
            { id: 54, label: 'Configuración del plan de cuentas y categorías del Estado de Resultados', type: 'CONFIG', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 55, label: 'Carga del presupuesto anual inicial', type: 'CARGA', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 56, label: 'Configuración de series documentarias (facturas, OC y guías)', type: 'CONFIG', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 57, label: 'Configuración de condiciones financieras por tipo de cliente', type: 'CONFIG', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 58, label: 'Validación: Ventas y Pre-facturación', type: 'VALID', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 59, label: 'Validación: Facturación', type: 'VALID', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 60, label: 'Validación: Cuentas por Cobrar', type: 'VALID', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 61, label: 'Validación: Cuentas por Pagar', type: 'VALID', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 62, label: 'Validación: Tesorería y Match Bancario', type: 'VALID', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 63, label: 'Validación: Estado de Resultados', type: 'VALID', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 64, label: 'Validación: Caja Chica y Anticipos', type: 'VALID', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 65, label: 'Validación: Financiamiento y Deuda', type: 'VALID', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 66, label: 'Validación: Presupuesto vs Real', type: 'VALID', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 67, label: 'Validación: Valorizaciones', type: 'VALID', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 68, label: 'Validación: Activos Fijos', type: 'VALID', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 69, label: 'Validación: Business Intelligence (Dashboard, BI Comercial, BI Operativo, BI Financiero)', type: 'VALID', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 70, label: 'Validación: Inteligencia Artificial (IA Comercial, IA Operativa, IA Financiera)', type: 'VALID', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 71, label: 'Personalización: partidas del presupuesto y categorías ER propias del cliente', type: 'PERS', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },
            { id: 72, label: 'HITO: ERP ADMINISTRATIVO VALIDADO Y EN PRODUCCIÓN', type: 'HITO', weeks: [0, 0, 0, 0, 1, 0, 0, 0] },

            // ── SEMANA 6 (20–24 Jul) ─────────────────────────────────────────────────
            { section: 'SEC_S6_FLOTA' },
            { id: 73, label: 'Carga del maestro de equipos (modelos, series y horómetros base)', type: 'CARGA', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 74, label: 'Configuración de contratos de alquiler vigentes', type: 'CONFIG', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 75, label: 'Configuración de tipos de trabajo y metas de disponibilidad mecánica (DMR) por contrato', type: 'CONFIG', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 76, label: 'Carga del plan de mantenimiento preventivo inicial', type: 'CARGA', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 77, label: 'Validación: Dashboard Gerencial Operativo', type: 'VALID', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 78, label: 'Validación: Mis OTs del Día (vista móvil por rol)', type: 'VALID', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 79, label: 'Validación: Mapa de Campo', type: 'VALID', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 80, label: 'Validación: Panel de Flota y Contratos de Alquiler', type: 'VALID', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 81, label: 'Validación: Actas y Despachos de equipos', type: 'VALID', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 82, label: 'Validación: Liquidación y Disponibilidad Mecánica (DMR)', type: 'VALID', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 83, label: 'Validación: Pasaporte de Equipos', type: 'VALID', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 84, label: 'Validación: Gestión de Garantías', type: 'VALID', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 85, label: 'Validación: Certificaciones del Activo', type: 'VALID', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 86, label: 'Validación: Bandeja Maestra de Órdenes de Trabajo', type: 'VALID', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 87, label: 'Validación: Creación de OT (clasificación y herencia de costo)', type: 'VALID', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 88, label: 'Validación: Partes de Taller y Cierre y Conformidad', type: 'VALID', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 89, label: 'Validación: Backlog Operativo y Programación de Mantenimiento Preventivo', type: 'VALID', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 90, label: 'Validación: KPIs de Confiabilidad (MTBF, MTTR, DMR) y Disponibilidad vs Meta', type: 'VALID', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },
            { id: 91, label: 'Personalización: equipos reales, contratos vigentes y metas DMR por contrato', type: 'PERS', weeks: [0, 0, 0, 0, 0, 1, 0, 0] },

            // ── SEMANA 7 (27–31 Jul) ─────────────────────────────────────────────────
            { section: 'SEC_S7_PROD' },
            { id: 92, label: 'Carga del catálogo de repuestos con costos reales', type: 'CARGA', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 93, label: 'Configuración de áreas productivas (Maestranza, Soldadura, Fabricación y Ensamble)', type: 'CONFIG', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 94, label: 'Carga de listas de materiales de los principales procesos', type: 'CARGA', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 95, label: 'Configuración de rutas de transporte y tarifas por zona', type: 'CONFIG', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 96, label: 'Validación: Dashboard de Producción', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 97, label: 'Validación: Órdenes de Fabricación y Planificación', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 98, label: 'Validación: Control de Producción en Piso de Planta', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 99, label: 'Validación: OEE y Rendimiento', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 100, label: 'Validación: No Conformidades y Control de Calidad', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 101, label: 'Validación: Trazabilidad de Producción', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 102, label: 'Validación: Maestranza · Soldadura · Fabricación y Ensamble', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 103, label: 'Validación: Inventario, Kardex y SOLPE Operativo', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 104, label: 'Validación: Compras e Importación — Supply Chain', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 105, label: 'Validación: Monitor de Viajes y Hoja de Ruta', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 106, label: 'Validación: Scheduler y Despacho', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 107, label: 'Validación: Catálogo de Repuestos y Órdenes de Venta', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 108, label: 'Validación: Guías y Despachos de Repuestos', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },
            { id: 109, label: 'Personalización: catálogo, rutas y tarifas reales del cliente', type: 'PERS', weeks: [0, 0, 0, 0, 0, 0, 1, 0] },

            // ── SEMANA 8 (3–9 Ago) ───────────────────────────────────────────────────
            { section: 'SEC_S8_HSE' },
            { id: 110, label: 'Configuración de protocolos HSE propios de ZAHORY', type: 'CONFIG', weeks: [0, 0, 0, 0, 0, 0, 0, 1] },
            { id: 111, label: 'Carga de plantillas PETAR y ATS según operaciones del cliente', type: 'CARGA', weeks: [0, 0, 0, 0, 0, 0, 0, 1] },
            { id: 112, label: 'Validación: Dashboard HSE', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 0, 1] },
            { id: 113, label: 'Validación: Permisos de Trabajo en Alto Riesgo (PETAR)', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 0, 1] },
            { id: 114, label: 'Validación: Registro de Incidentes', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 0, 1] },
            { id: 115, label: 'Validación: EPP y Certificaciones del Personal', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 0, 1] },
            { id: 116, label: 'Validación: Análisis de Trabajo Seguro (ATS)', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 0, 1] },
            { id: 117, label: 'Validación: Protocolo de Bloqueo y Etiquetado (LOTO)', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 0, 1] },
            { id: 118, label: 'Activación de documentos descargables: OT, Actas, Liquidación y Guías', type: 'CONFIG', weeks: [0, 0, 0, 0, 0, 0, 0, 1] },
            { id: 119, label: 'Validación del flujo completo: Backlog → OT → Parte → Cierre → Liquidación → Valorización → Factura', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 0, 1] },
            { id: 120, label: 'Validación en dispositivo móvil (técnicos y personal de campo)', type: 'VALID', weeks: [0, 0, 0, 0, 0, 0, 0, 1] },
            { id: 121, label: 'Configuración final de usuarios, accesos y contraseñas del cliente', type: 'CONFIG', weeks: [0, 0, 0, 0, 0, 0, 0, 1] },
            { id: 122, label: 'Entrega de manual de usuario y sesión de capacitación final con ZAHORY', type: 'CONFIG', weeks: [0, 0, 0, 0, 0, 0, 0, 1] },
            { id: 123, label: 'HITO: TIDEO OPERA COMPLETO EN PRODUCCIÓN — ENTREGADO A ZAHORY', type: 'HITO', weeks: [0, 0, 0, 0, 0, 0, 0, 1] },
        ];

        // ── BUILD TABLE ────────────────────────────────────────────────────────────
        const collapsedSections = new Set();
        let currentFilter = 'ALL';

        
        
        let allCollapsed = false;
        function toggleAllSections(e) {
            allCollapsed = !allCollapsed;
            
            const table = e.currentTarget.closest('table');
            const icon = e.currentTarget.querySelector('span');
            if(icon) icon.style.transform = allCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
            
            Object.keys(SECTIONS).forEach(key => {
                if (allCollapsed) collapsedSections.add(key);
                else collapsedSections.delete(key);
            });
            
            table.querySelectorAll('tr.row-section, tr.row-sec').forEach(tr => {
                tr.classList.toggle('collapsed', allCollapsed);
            });
            
            applyFilter(currentFilter);
        }

        

        
        function attachToggleToTable(tbody) {
            setTimeout(() => {
                if (!tbody) return;
                const table = tbody.closest('table');
                if (!table) return;
                const btn = table.querySelector('.js-toggle-all');
                if (btn && !btn.dataset.listenerAttached) {
                    btn.addEventListener('click', toggleAllSections);
                    btn.dataset.listenerAttached = 'true';
                }
            }, 50);
        }

        function buildTable() {
            const tbody = document.getElementById('ganttBodyImp');
            tbody.innerHTML = '';
            attachToggleToTable(tbody);
            let currentSection = null;
            const sectionWeeks = {};
            ROWS.forEach(row => {
                if (row.section) {
                    currentSection = row.section;
                    if (!sectionWeeks[currentSection]) sectionWeeks[currentSection] = [];
                } else if (currentSection && row.weeks) {
                    row.weeks.forEach((w, i) => {
                        if (w) sectionWeeks[currentSection][i] = 1;
                    });
                }
            });
            currentSection = null;
            ROWS.forEach(row => {
                if (row.section) {
                    currentSection = row.section;
                    const sec = SECTIONS[row.section];
                    const tr = document.createElement('tr');
                    tr.className = 'row-sec ' + (sec.cls || '');
                    tr.dataset.section = row.section;
                    const tdLabel = document.createElement('td');
                    tdLabel.colSpan = 3;
                    tdLabel.innerHTML = `<span class="sec-toggle">▾</span>${sec.label}`;
                    tr.appendChild(tdLabel);
                    const sWeeks = sectionWeeks[row.section] || [];
                    for (let wi = 0; wi < 8; wi++) {
                        const td = document.createElement('td');
                        td.className = 'c-wk ' + WK_CLS[wi];
                        if (sWeeks[wi]) {
                            const bar = document.createElement('span');
                            bar.className = 'bar bar-INTERN';
                            bar.style.opacity = '0.5';
                            td.appendChild(bar);
                        }
                        tr.appendChild(td);
                    }
                    tr.addEventListener('click', () => toggleSection(row.section));
                    tbody.appendChild(tr);
                    return;
                }
                const isHito = row.type === 'HITO';
                const isIntern = row.type === 'INTERN';
                const tr = document.createElement('tr');
                tr.className = isHito ? 'row-hito' : isIntern ? 'row-intern row-act' : 'row-act';
                tr.dataset.type = row.type;
                tr.dataset.id = row.id;
                tr.dataset.section = currentSection;

                // num
                const tdN = document.createElement('td');
                tdN.className = 'c-num';
                tdN.textContent = isHito ? '◆' : row.id;
                tr.appendChild(tdN);

                // label
                const tdL = document.createElement('td');
                tdL.className = 'c-lbl' + (isHito ? ' lbl-hito' : isIntern ? ' lbl-intern' : '');
                tdL.textContent = row.label;
                tr.appendChild(tdL);

                // type badge
                const tdT = document.createElement('td');
                tdT.className = 'c-type';
                if (!isHito) {
                    const b = document.createElement('span');
                    b.className = `badge b-${isIntern ? 'INTERN' : row.type}`;
                    b.textContent = row.type;
                    tdT.appendChild(b);
                }
                tr.appendChild(tdT);

                // 8 week cells
                row.weeks.forEach((active, wi) => {
                    const td = document.createElement('td');
                    td.className = 'c-wk ' + WK_CLS[wi];
                    if (active) {
                        const bar = document.createElement('span');
                        if (isHito) bar.className = 'bar bar-HITO';
                        else if (isIntern) bar.className = 'bar bar-INTERN';
                        else bar.className = `bar bar-${row.type}`;
                        bar.addEventListener('mouseenter', e => showTip(e, row, wi));
                        bar.addEventListener('mousemove', e => moveTip(e));
                        bar.addEventListener('mouseleave', hideTip);
                        td.appendChild(bar);
                    }
                    tr.appendChild(td);
                });

                tbody.appendChild(tr);
            });
        }

        // ── TOOLTIP ───────────────────────────────────────────────────────────────
        const tip = document.getElementById('tooltip');
        const ttT = document.getElementById('tt-type');
        const ttN = document.getElementById('tt-name');
        function showTip(e, row, wi) { ttT.textContent = TYPE_LABELS[row.type] + ' · ' + WK_LABELS[wi]; ttN.textContent = row.label; tip.classList.add('visible'); moveTip(e); }
        function moveTip(e) { let x = e.clientX + 14, y = e.clientY + 14; if (x + 310 > window.innerWidth) x = e.clientX - 314; if (y + 80 > window.innerHeight) y = e.clientY - 80; tip.style.left = x + 'px'; tip.style.top = y + 'px'; }
        function hideTip() { tip.classList.remove('visible'); }

        // ── FILTERS ───────────────────────────────────────────────────────────────
        document.querySelectorAll('#view-implementacion .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#view-implementacion .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyFilter(btn.dataset.type);
            });
        });

        function toggleSection(key) {
            if (collapsedSections.has(key)) collapsedSections.delete(key);
            else collapsedSections.add(key);
            document.querySelectorAll(`tr.row-sec[data-section="${key}"]`)
                .forEach(tr => tr.classList.toggle('collapsed', collapsedSections.has(key)));
            applyFilter(currentFilter);
        }

        function applyFilter(f) {
            currentFilter = f;
            const rows = document.querySelectorAll('#ganttBodyImp tr');
            let visible = 0;
            rows.forEach(tr => {
                if (tr.classList.contains('row-sec')) return;
                const t = tr.dataset.type;
                // PERS filter also shows CARGA; HITO always shows with ALL
                const match = f === 'ALL'
                    || t === f
                    || (f === 'PERS' && (t === 'PERS' || t === 'CARGA'));
                const collapsed = collapsedSections.has(tr.dataset.section);
                tr.classList.toggle('row-hidden', !match || collapsed);
                if (match && !collapsed) visible++;
            });
            // hide empty section headers
            rows.forEach(tr => {
                if (!tr.classList.contains('row-sec')) return;
                let next = tr.nextElementSibling, any = false;
                while (next && !next.classList.contains('row-sec')) {
                    if (!next.classList.contains('row-hidden')) { any = true; break; }
                    next = next.nextElementSibling;
                }
                const isCollapsed = collapsedSections.has(tr.dataset.section);
                tr.classList.toggle('row-hidden', !any && !isCollapsed);
            });
            document.getElementById('stats-pill-imp').innerHTML = `<strong>${visible}</strong> de 123 actividades`;
        }

        buildTable();
        attachToggleListener();

            window.renderGanttImp = function() { buildTable();
        attachToggleListener(); applyFilter(currentFilter); };
        })();

        // ── SIDEBAR TOGGLE (shared across both views) ───────────────────────────────
        const sidebarEl = document.querySelector('.sidebar');
        const sidebarToggleBtn = document.getElementById('sidebarToggle');
        function setSidebarCollapsed(collapsed) {
            sidebarEl.classList.toggle('collapsed', collapsed);
            document.body.classList.toggle('sidebar-collapsed', collapsed);
            try { localStorage.setItem('tideoSidebarCollapsed', collapsed ? '1' : '0'); } catch (e) {}
        }
        let storedCollapsed = false;
        try { storedCollapsed = localStorage.getItem('tideoSidebarCollapsed') === '1'; } catch (e) {}
        setSidebarCollapsed(storedCollapsed);
        sidebarToggleBtn.addEventListener('click', () => {
            setSidebarCollapsed(!sidebarEl.classList.contains('collapsed'));
        });

        switchView('implementacion');
    