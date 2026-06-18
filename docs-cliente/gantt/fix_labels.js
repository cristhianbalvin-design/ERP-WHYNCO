const fs = require('fs');

function fixLabels(filename) {
    let content = fs.readFileSync(filename, 'utf8');

    content = content.replace(/SEC_S1_SETUP: \{ label: '— SEMANA \d+: CONFIGURACIÓN INICIAL Y RRHH PARTE 1 —', cls: '' \},/g, "SEC_S1_SETUP: { label: '— SEMANA 7: CONFIGURACIÓN INICIAL Y RRHH PARTE 1 —', cls: '' },");
    content = content.replace(/SEC_S2_RRHH: \{ label: '— SEMANA \d+: RRHH PARTE 2 —', cls: '' \},/g, "SEC_S2_RRHH: { label: '— SEMANA 8: RRHH PARTE 2 —', cls: '' },");
    content = content.replace(/SEC_S3_INT: \{ label: '— SEMANA \d+: INTERNA — CABLEADO ERP OPERATIVO —', cls: 's-int' \},/g, "SEC_S3_INT: { label: '— SEMANA 9: INTERNA — CABLEADO ERP OPERATIVO —', cls: 's-int' },");
    content = content.replace(/SEC_S4_CRM: \{ label: '— SEMANA \d+: CRM, COMERCIAL Y COMPRAS —', cls: '' \},/g, "SEC_S4_CRM: { label: '— SEMANA 10: CRM, COMERCIAL Y COMPRAS —', cls: '' },");
    content = content.replace(/SEC_S5_FIN: \{ label: '— SEMANA \d+: ADMINISTRACIÓN, FINANZAS Y CIERRE ERP ADMINISTRATIVO —', cls: '' \},/g, "SEC_S5_FIN: { label: '— SEMANA 11: ADMINISTRACIÓN, FINANZAS Y CIERRE ERP ADMINISTRATIVO —', cls: '' },");
    content = content.replace(/SEC_S6_FLOTA: \{ label: '— SEMANA \d+: FLOTA, TALLER Y CONFIABILIDAD —', cls: 's-op' \},/g, "SEC_S6_FLOTA: { label: '— SEMANA 12: FLOTA, TALLER Y CONFIABILIDAD —', cls: 's-op' },");
    content = content.replace(/SEC_S7_PROD: \{ label: '— SEMANA \d+: PRODUCCIÓN, SUPPLY CHAIN Y TRANSPORTE —', cls: 's-op' \},/g, "SEC_S7_PROD: { label: '— SEMANA 13: PRODUCCIÓN, SUPPLY CHAIN Y TRANSPORTE —', cls: 's-op' },");
    content = content.replace(/SEC_S8_HSE: \{ label: '— SEMANA \d+: SEGURIDAD & SALUD \+ PASE A PRODUCCIÓN FINAL —', cls: 's-op' \},/g, "SEC_S8_HSE: { label: '— SEMANA 14: SEGURIDAD & SALUD + PASE A PRODUCCIÓN FINAL —', cls: 's-op' },");

    fs.writeFileSync(filename, content);
    console.log('Fixed ' + filename);
}

fixLabels('index.html');
fixLabels('gantt_implementacion.html');
