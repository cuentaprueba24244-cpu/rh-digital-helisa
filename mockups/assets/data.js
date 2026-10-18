/* =====================================================================
   RH digital Comserva · datos de prueba compartidos por todos los mockups
   -------------------------------------------------------------------
   Los datos de Cofema (septiembre de 2026) son los reales de la planilla
   22641-26, el acta 25676 y la factura FVE 25756. Todo lo demás es ficticio
   pero verosímil para Florencia (Caquetá). "Hoy" en los mockups es el
   lunes 19 de octubre de 2026, dentro del periodo octubre (27 sep – 26 oct).
   ===================================================================== */
window.DATA = (function () {
  const HOY = '2026-10-19';

  const empresa = {
    razon_social: 'Comercializadora de Servicios Varios S.A.S.',
    nombre_corto: 'Comserva S.A.S.',
    nit: '828.002.730-1',
    direccion: 'Km 8 Vereda San Juan del Barro, corregimiento San Martín',
    ciudad: 'Florencia, Caquetá',
    telefonos: '310 412 1493 · 312 497 9097',
    email: 'comserva_saesp@hotmail.com',
    licencia: 'Licencia Ambiental N.º 0038 del 23 de enero de 2006, CORPOAMAZONIA',
    responsable_iva: 'Responsable de IVA',
    gerente: 'Diego Alfonso Cartagena Mayorquín',
    bancos: 'Cta. Cte. Davivienda 078169999147 · Cta. Ahorros Bancolombia 466-000038-91',
  };

  const parametros = {
    dia_corte: 26,
    iva_pct: 19,
    formato_planilla: '{n}-{yy}',
    siguiente_planilla: 22702,
    siguiente_recibo: 35688,
    siguiente_acta: 25731,
    siguiente_constancia: 1187,
    rango_por_operario: 50,
    max_fotos: 3,
    tolerancia_reloj_min: 10,
    aviso_datos: 'Comserva S.A.S. tratará su nombre, documento, firma y la ubicación de esta visita para dejar constancia del servicio de recolección, conforme a la Ley 1581 de 2012 y su política de tratamiento de datos. Puede consultar, actualizar o suprimir sus datos escribiendo a comserva_saesp@hotmail.com.',
  };

  const dispositores = [
    { id: 'inci', nombre: 'Incihuila S.A.S E.S.P', nit: '813.005.241-8', tratamiento: 'Tratamiento térmico (incineración)', ciudad: 'Neiva, Huila' },
    { id: 'sura', nombre: 'Sur Ambiental S.A.S', nit: '900.412.775-1', tratamiento: 'Celdas de seguridad', ciudad: 'Pitalito, Huila' },
  ];

  // Catálogo único: 9 categorías de la planilla, con nombre del acta, tratamiento y dispositor
  const categorias = [
    { codigo: 'BIO', nombre: 'Biológicos', nombre_acta: 'Biológicos', grupo: 'Residuos biológicos, infecciosos y peligrosos', en_acta: true, tratamiento: 'Tratamiento térmico (incineración)', dispositor: 'inci', orden: 1, ayuda: 'Gasas, guantes, jeringas, apósitos' },
    { codigo: 'CORTO', nombre: 'Cortopunzantes', nombre_acta: 'Cortopunzantes', grupo: 'Residuos biológicos, infecciosos y peligrosos', en_acta: true, tratamiento: 'Tratamiento térmico (incineración)', dispositor: 'inci', orden: 2, ayuda: 'Guardianes rotulados' },
    { codigo: 'ANATO', nombre: 'Anatomopatológicos', nombre_acta: 'Anatomopatológicos', grupo: 'Residuos biológicos, infecciosos y peligrosos', en_acta: true, tratamiento: 'Tratamiento térmico (incineración)', dispositor: 'inci', orden: 3, ayuda: 'Tejidos, órganos, fluidos' },
    { codigo: 'ANIMAL', nombre: 'Animales', nombre_acta: 'Animales', grupo: 'Residuos biológicos, infecciosos y peligrosos', en_acta: false, tratamiento: 'Sin tratamiento definido', dispositor: null, orden: 4, ayuda: 'Pendiente de decisión de la gerencia' },
    { codigo: 'CORROS', nombre: 'Corrosivos', nombre_acta: 'Corrosivos', grupo: 'Otros residuos o desechos peligrosos', en_acta: true, tratamiento: 'Celdas de seguridad', dispositor: 'sura', orden: 5, ayuda: 'Ácidos, bases' },
    { codigo: 'EXPLOS', nombre: 'Explosivos', nombre_acta: 'Explosivos', grupo: 'Otros residuos o desechos peligrosos', en_acta: false, tratamiento: 'Sin tratamiento definido', dispositor: null, orden: 6, ayuda: 'Pendiente de decisión de la gerencia' },
    { codigo: 'REACT', nombre: 'Reactivos', nombre_acta: 'Reactivos (líquidos de laboratorio)', grupo: 'Otros residuos o desechos peligrosos', en_acta: true, tratamiento: 'Celdas de seguridad', dispositor: 'sura', orden: 7, ayuda: 'Líquidos de laboratorio' },
    { codigo: 'TOX', nombre: 'Tóxicos', nombre_acta: 'Tóxicos', grupo: 'Otros residuos o desechos peligrosos', en_acta: true, tratamiento: 'Tratamiento térmico (incineración)', dispositor: 'inci', orden: 8, ayuda: 'Medicamentos vencidos, citotóxicos' },
    { codigo: 'RAEES', nombre: 'RAEES', nombre_acta: 'RAEES', grupo: 'Aparatos eléctricos y electrónicos', en_acta: true, tratamiento: 'Celdas de seguridad', dispositor: 'sura', orden: 9, ayuda: 'Luminarias, equipos, pilas' },
  ];

  const operarios = [
    { id: 'op-dubeny', nombre: 'Dubeny Rojas Cuéllar', documento: '17.654.221', cargo: 'Conductor', telefono: '311 204 5581', usuario: 'dubeny', activo: true, dispositivo: 'Samsung Galaxy A35 · Android 15', rango_constancias: { desde: 1151, hasta: 1200, siguiente: 1187 }, rango_recibos: { desde: 35671, hasta: 35700, siguiente: 35688 } },
    { id: 'op-jesus', nombre: 'Jesús Perdomo Lozada', documento: '1.117.512.906', cargo: 'Auxiliar', telefono: '320 877 1043', usuario: 'jesus', activo: true, dispositivo: 'Xiaomi Redmi Note 13 · Android 14', rango_constancias: { desde: 1201, hasta: 1250, siguiente: 1209 }, rango_recibos: { desde: 35701, hasta: 35730, siguiente: 35703 } },
  ];

  const vehiculos = [
    { placa: 'SNV 429', descripcion: 'Furgón Chevrolet NHR · residuos peligrosos', activo: true },
    { placa: 'UQX 904', descripcion: 'Furgón JAC 1035 · respaldo', activo: true },
  ];

  const usuarios = [
    { id: 'u-lucrecia', nombre: 'Lucrecia Quintero Murcia', rol: 'facturacion', email: 'facturacion@comserva.com.co', activo: true, ultimo_acceso: '2026-10-19 07:52' },
    { id: 'u-diego', nombre: 'Diego Alfonso Cartagena Mayorquín', rol: 'gerencia', email: 'gerencia@comserva.com.co', activo: true, ultimo_acceso: '2026-10-17 16:10' },
    { id: 'u-dubeny', nombre: 'Dubeny Rojas Cuéllar', rol: 'operario', email: 'dubeny@comserva.com.co', activo: true, ultimo_acceso: '2026-10-19 06:48' },
    { id: 'u-jesus', nombre: 'Jesús Perdomo Lozada', rol: 'operario', email: 'jesus@comserva.com.co', activo: true, ultimo_acceso: '2026-10-19 06:51' },
  ];

  const ROL_LABEL = { operario: 'Operario', facturacion: 'Facturación y cartera', gerencia: 'Gerencia', admin: 'Administrador', cliente: 'Cliente' };

  // Clientes. Tarifa = valor básico mensual + kilos incluidos + precio del kilo adicional (+ IVA)
  const clientes = [
    { id: 'c-cofema', nit: '891190218', dv: '5', razon_social: 'Compañía de Fomento Empresarial y Mercados Agroindustriales S.A.', nombre_comercial: 'Cofema S.A.', sede: 'Campo / Base Florencia', direccion: 'Km 5 vía Morelia, Barrio Cofema', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Área de liquidación', telefono: '318 372 4275', whatsapp: '318 372 4275', email: 'liquidacion@cofemacaqueta.com.co', frecuencia: 'semanal', dia_visita: 'Sábado', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2024-02-01',
      tarifas: [
        { desde: '2026-01-01', hasta: null, basico: 74790, kg_incluidos: 20, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: 'Confirmar kilos incluidos (deducidos de la FVE 25756)' },
        { desde: '2025-01-01', hasta: '2025-12-31', basico: 71200, kg_incluidos: 20, precio_kg: 4380, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' },
      ] },
    { id: 'c-punto', nit: '1117490216', dv: '2', razon_social: 'Punto Ekonómico Droguería y Papelería', nombre_comercial: 'Punto Ekonómico', sede: 'Local principal', direccion: 'Calle 4 N.º 5-22, centro', ciudad: 'Albania', departamento: 'Caquetá', contacto: 'Administración', telefono: '313 509 7712', whatsapp: '313 509 7712', email: 'puntoekonomico@gmail.com', frecuencia: 'quincenal', dia_visita: 'Miércoles', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2026-07-27',
      tarifas: [{ desde: '2026-07-27', hasta: null, basico: 55000, kg_incluidos: 6, precio_kg: 4000, iva_pct: 19, plazo: '10 primeros días del mes siguiente', nota: 'Según contrato del 27 jul 2026' }] },
    { id: 'c-saludvital', nit: '901233845', dv: '7', razon_social: 'IPS Salud Vital Florencia S.A.S.', nombre_comercial: 'IPS Salud Vital', sede: 'Sede Centro', direccion: 'Carrera 11 N.º 14-30', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Jefe de enfermería', telefono: '315 622 0098', whatsapp: '315 622 0098', email: 'calidad@saludvitalflorencia.co', frecuencia: 'semanal', dia_visita: 'Lunes', estado: 'activo', cartera: 'en_mora', cartera_fuente: 'Excel Helisa 17 oct', creado: '2023-05-10',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 120000, kg_incluidos: 30, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-labamazonia', nit: '900876120', dv: '3', razon_social: 'Laboratorio Clínico Amazonía Ltda.', nombre_comercial: 'Laboratorio Amazonía', sede: 'Sede única', direccion: 'Calle 16 N.º 8-45, Barrio Juan XXIII', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Bacterióloga coordinadora', telefono: '310 455 8821', whatsapp: '310 455 8821', email: 'laboratorio.amazonia@outlook.com', frecuencia: 'quincenal', dia_visita: 'Martes', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2024-09-15',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 65000, kg_incluidos: 10, precio_kg: 4800, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-sonrisas', nit: '40611029', dv: '1', razon_social: 'Odontología Sonrisas del Caquetá', nombre_comercial: 'Sonrisas del Caquetá', sede: 'Consultorio', direccion: 'Carrera 9 N.º 12-18, oficina 201', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Dra. Patricia', telefono: '314 780 2234', whatsapp: '314 780 2234', email: 'sonrisascaqueta@gmail.com', frecuencia: 'mensual', dia_visita: 'Primer jueves', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Manual', creado: '2025-03-02',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 48000, kg_incluidos: 6, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-economia', nit: '17688452', dv: '9', razon_social: 'Droguería La Economía de Morelia', nombre_comercial: 'Droguería La Economía', sede: 'Local', direccion: 'Calle 5 N.º 3-10, parque principal', ciudad: 'Morelia', departamento: 'Caquetá', contacto: 'Don Arnulfo', telefono: '321 334 9087', whatsapp: '321 334 9087', email: '', frecuencia: 'mensual', dia_visita: 'Tercer viernes', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Recibo de caja', creado: '2025-11-20',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 45000, kg_incluidos: 6, precio_kg: 4000, iva_pct: 19, plazo: 'Paga en efectivo en la visita', nota: 'Paga en efectivo' }] },
    { id: 'c-huellas', nit: '900654321', dv: '0', razon_social: 'Veterinaria Huellas Felices S.A.S.', nombre_comercial: 'Veterinaria Huellas', sede: 'Clínica veterinaria', direccion: 'Avenida Circunvalar N.º 20-55', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Dr. Mauricio', telefono: '316 902 4471', whatsapp: '316 902 4471', email: 'huellasfelicesvet@gmail.com', frecuencia: 'quincenal', dia_visita: 'Jueves', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2024-06-11',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 52000, kg_incluidos: 8, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: 'Genera residuos de animales (categoría sin tratamiento definido)' }] },
    { id: 'c-pielviva', nit: '1117534098', dv: '6', razon_social: 'Centro de Estética Piel Viva', nombre_comercial: 'Piel Viva', sede: 'Local', direccion: 'Calle 19 N.º 10-77', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Yurany', telefono: '317 229 5510', whatsapp: '317 229 5510', email: 'pielvivaestetica@gmail.com', frecuencia: 'mensual', dia_visita: 'Segundo lunes', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Recibo de caja', creado: '2026-02-09',
      tarifas: [{ desde: '2026-02-09', hasta: null, basico: 42000, kg_incluidos: 5, precio_kg: 4600, iva_pct: 19, plazo: 'Paga en efectivo en la visita', nota: 'Paga en efectivo' }] },
    { id: 'c-visionsur', nit: '900334876', dv: '4', razon_social: 'Clínica Oftalmológica Visión Sur S.A.S.', nombre_comercial: 'Visión Sur', sede: 'Sede principal', direccion: 'Carrera 14 N.º 7-90', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Coordinación de calidad', telefono: '312 648 7730', whatsapp: '312 648 7730', email: 'calidad@visionsur.co', frecuencia: 'semanal', dia_visita: 'Viernes', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2023-01-18',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 95000, kg_incluidos: 20, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-tinta', nit: '1006834120', dv: '8', razon_social: 'Estudio de Tatuajes Tinta Negra', nombre_comercial: 'Tinta Negra', sede: 'Estudio', direccion: 'Calle 13 N.º 11-04', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Kevin', telefono: '323 118 6604', whatsapp: '323 118 6604', email: '', frecuencia: 'mensual', dia_visita: 'Último martes', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Recibo de caja', creado: '2026-05-05',
      tarifas: [{ desde: '2026-05-05', hasta: null, basico: 40000, kg_incluidos: 4, precio_kg: 4600, iva_pct: 19, plazo: 'Paga en efectivo en la visita', nota: 'Paga en efectivo' }] },
    { id: 'c-ramirez', nit: '7712330', dv: '2', razon_social: 'Consultorio Médico Dr. Ramírez', nombre_comercial: 'Consultorio Dr. Ramírez', sede: 'Consultorio', direccion: 'Carrera 8 N.º 15-61', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Secretaria', telefono: '318 400 2290', whatsapp: '318 400 2290', email: 'consultorioramirez@hotmail.com', frecuencia: 'mensual', dia_visita: 'Primer miércoles', estado: 'activo', cartera: 'en_mora', cartera_fuente: 'Excel Helisa 17 oct', creado: '2022-08-30',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 46000, kg_incluidos: 6, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-olivos', nit: '900128790', dv: '1', razon_social: 'Funeraria Los Olivos del Caquetá S.A.S.', nombre_comercial: 'Funeraria Los Olivos', sede: 'Sala de tanatopraxia', direccion: 'Calle 21 N.º 6-14', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Administrador', telefono: '311 557 9034', whatsapp: '311 557 9034', email: 'losolivoscaqueta@gmail.com', frecuencia: 'quincenal', dia_visita: 'Sábado', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2024-11-03',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 60000, kg_incluidos: 10, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-nueva', nit: '1117211340', dv: '', razon_social: 'Droguería Nueva Esperanza', nombre_comercial: 'Droguería Nueva Esperanza', sede: 'Local', direccion: 'Barrio Las Malvinas, manzana C casa 12', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Doña Rosalba', telefono: '320 110 4456', whatsapp: '320 110 4456', email: '', frecuencia: 'mensual', dia_visita: '', estado: 'pendiente_validar', cartera: 'sin_info', cartera_fuente: '', creado: '2026-10-16', creado_por: 'Dubeny Rojas (en campo)',
      tarifas: [] },
  ];

  const FRECUENCIA_LABEL = { semanal: 'Semanal', quincenal: 'Quincenal', mensual: 'Mensual', demanda: 'Por demanda' };
  const CARTERA_LABEL = { al_dia: 'Al día', en_mora: 'En mora', sin_info: 'Sin información' };
  const ESTADO_VISITA_LABEL = { borrador: 'Borrador', cerrada: 'Guardada en el celular', transmitida: 'Transmitida', rechazada: 'Rechazada', en_cierre: 'En el cierre', anulada: 'Anulada' };

  const periodos = [
    { id: '2026-08', nombre: 'Agosto 2026', inicio: '2026-07-27', fin: '2026-08-26', estado: 'cerrado', cerrado_en: '2026-08-26 17:20', cerrado_por: 'Lucrecia Quintero', clientes: 12, kg: 1842.4, visitas: 61 },
    { id: '2026-09', nombre: 'Septiembre 2026', inicio: '2026-08-27', fin: '2026-09-26', estado: 'cerrado', cerrado_en: '2026-09-26 17:41', cerrado_por: 'Lucrecia Quintero', version: 1 },
    { id: '2026-10', nombre: 'Octubre 2026', inicio: '2026-09-27', fin: '2026-10-26', estado: 'abierto', cerrado_en: null, cerrado_por: null },
  ];

  // --- visitas ---------------------------------------------------------
  // kilos: objeto {codigo: kg}. Tipo: 'recoleccion' | 'fallida'.
  // estado: borrador | cerrada (en celular) | transmitida | rechazada | en_cierre | anulada
  const visitas = [
    // Cofema, septiembre 2026 (reales: planilla 22641-26)
    { id: 'v-cof-0905', consecutivo: 1092, cliente: 'c-cofema', periodo: '2026-09', fecha: '2026-09-05', hora: '10:15', hora_servidor: '10:16', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 39.35, ANATO: 35.6 }, bolsas: 8, guardianes: 0, entrega_nombre: 'Yesid Calderón', entrega_documento: '96.351.204', gps: [1.6089, -75.6168], firmas: true, fotos: 0, planilla: '22641-26' },
    { id: 'v-cof-0912', consecutivo: 1101, cliente: 'c-cofema', periodo: '2026-09', fecha: '2026-09-12', hora: '09:37', hora_servidor: '09:37', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 41.7, ANATO: 61.8 }, bolsas: 10, guardianes: 0, entrega_nombre: 'Yesid Calderón', entrega_documento: '96.351.204', gps: [1.6089, -75.6168], firmas: true, fotos: 0, planilla: '22641-26' },
    { id: 'v-cof-0919', consecutivo: 1118, cliente: 'c-cofema', periodo: '2026-09', fecha: '2026-09-19', hora: '09:45', hora_servidor: '09:46', operario: 'op-jesus', auxiliar: 'op-dubeny', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { ANATO: 77.4, RAEES: 67.5 }, bolsas: 12, guardianes: 0, entrega_nombre: 'Yesid Calderón', entrega_documento: '96.351.204', gps: [1.6089, -75.6168], firmas: true, fotos: 1, planilla: '22641-26' },
    { id: 'v-cof-0922', consecutivo: 1124, cliente: 'c-cofema', periodo: '2026-09', fecha: '2026-09-22', hora: '10:30', hora_servidor: '10:31', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 40.3, ANATO: 50.2 }, bolsas: 9, guardianes: 0, entrega_nombre: 'Yesid Calderón', entrega_documento: '96.351.204', gps: [1.6089, -75.6168], firmas: true, fotos: 0, planilla: '22641-26' },

    // Otros clientes, septiembre (resumen suficiente para el cierre)
    { id: 'v-sv-0901', consecutivo: 1088, cliente: 'c-saludvital', periodo: '2026-09', fecha: '2026-09-01', hora: '08:10', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 18.4, CORTO: 2.1, ANATO: 4.0 }, bolsas: 5, guardianes: 2, entrega_nombre: 'Enf. Marcela Ruiz', entrega_documento: '1.117.230.118', gps: [1.6152, -75.6113], firmas: true, fotos: 0 },
    { id: 'v-sv-0908', consecutivo: 1097, cliente: 'c-saludvital', periodo: '2026-09', fecha: '2026-09-08', hora: '08:05', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 16.9, CORTO: 1.8 }, bolsas: 4, guardianes: 2, entrega_nombre: 'Enf. Marcela Ruiz', entrega_documento: '1.117.230.118', gps: [1.6152, -75.6113], firmas: true, fotos: 0 },
    { id: 'v-sv-0915', consecutivo: 1108, cliente: 'c-saludvital', periodo: '2026-09', fecha: '2026-09-15', hora: '08:20', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 20.2, CORTO: 2.4, TOX: 1.5 }, bolsas: 6, guardianes: 2, entrega_nombre: 'Enf. Marcela Ruiz', entrega_documento: '1.117.230.118', gps: [1.6152, -75.6113], firmas: true, fotos: 0 },
    { id: 'v-sv-0922', consecutivo: 1125, cliente: 'c-saludvital', periodo: '2026-09', fecha: '2026-09-22', hora: '08:00', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 17.3, CORTO: 2.0 }, bolsas: 5, guardianes: 2, entrega_nombre: 'Enf. Marcela Ruiz', entrega_documento: '1.117.230.118', gps: [1.6152, -75.6113], firmas: true, fotos: 0 },
    { id: 'v-lab-0902', consecutivo: 1090, cliente: 'c-labamazonia', periodo: '2026-09', fecha: '2026-09-02', hora: '11:05', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 6.2, CORTO: 1.1, REACT: 3.4 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Bact. Sandra Gómez', entrega_documento: '40.772.310', gps: [1.6201, -75.6049], firmas: true, fotos: 0 },
    { id: 'v-lab-0916', consecutivo: 1110, cliente: 'c-labamazonia', periodo: '2026-09', fecha: '2026-09-16', hora: '11:20', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 5.8, CORTO: 0.9, REACT: 2.6 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Bact. Sandra Gómez', entrega_documento: '40.772.310', gps: [1.6201, -75.6049], firmas: true, fotos: 0 },
    { id: 'v-vs-0904', consecutivo: 1091, cliente: 'c-visionsur', periodo: '2026-09', fecha: '2026-09-04', hora: '14:10', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 9.4, CORTO: 1.2 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Aux. Liliana Peña', entrega_documento: '1.117.401.556', gps: [1.6170, -75.6080], firmas: true, fotos: 0 },
    { id: 'v-vs-0911', consecutivo: 1100, cliente: 'c-visionsur', periodo: '2026-09', fecha: '2026-09-11', hora: '14:00', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 8.1, CORTO: 1.0 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Aux. Liliana Peña', entrega_documento: '1.117.401.556', gps: [1.6170, -75.6080], firmas: true, fotos: 0 },
    { id: 'v-vs-0918', consecutivo: 1115, cliente: 'c-visionsur', periodo: '2026-09', fecha: '2026-09-18', hora: '14:25', operario: 'op-jesus', auxiliar: 'op-dubeny', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 10.6, CORTO: 1.3 }, bolsas: 4, guardianes: 1, entrega_nombre: 'Aux. Liliana Peña', entrega_documento: '1.117.401.556', gps: [1.6170, -75.6080], firmas: true, fotos: 0 },
    { id: 'v-vs-0925', consecutivo: 1131, cliente: 'c-visionsur', periodo: '2026-09', fecha: '2026-09-25', hora: '14:05', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 7.9, CORTO: 0.8 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Aux. Liliana Peña', entrega_documento: '1.117.401.556', gps: [1.6170, -75.6080], firmas: true, fotos: 0 },
    { id: 'v-son-0903', consecutivo: 1089, cliente: 'c-sonrisas', periodo: '2026-09', fecha: '2026-09-03', hora: '15:30', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 3.2, CORTO: 0.6 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Dra. Patricia Londoño', entrega_documento: '40.611.029', gps: [1.6145, -75.6101], firmas: true, fotos: 0 },
    { id: 'v-eco-0918', consecutivo: 1116, cliente: 'c-economia', periodo: '2026-09', fecha: '2026-09-18', hora: '16:40', operario: 'op-jesus', auxiliar: 'op-dubeny', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 2.1, CORTO: 0.4, TOX: 3.8 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Arnulfo Cabrera', entrega_documento: '17.688.452', gps: [1.4877, -75.7236], firmas: true, fotos: 0, recibo: 'r-35672' },
    { id: 'v-hue-0904', consecutivo: 1093, cliente: 'c-huellas', periodo: '2026-09', fecha: '2026-09-04', hora: '09:50', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 4.6, CORTO: 0.7, ANATO: 6.3 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Dr. Mauricio Trujillo', entrega_documento: '96.190.334', gps: [1.6233, -75.6002], firmas: true, fotos: 0 },
    { id: 'v-hue-0918', consecutivo: 1117, cliente: 'c-huellas', periodo: '2026-09', fecha: '2026-09-18', hora: '09:55', operario: 'op-jesus', auxiliar: 'op-dubeny', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 5.1, CORTO: 0.8, ANATO: 4.9 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Dr. Mauricio Trujillo', entrega_documento: '96.190.334', gps: [1.6233, -75.6002], firmas: true, fotos: 0 },
    { id: 'v-pv-0914', consecutivo: 1105, cliente: 'c-pielviva', periodo: '2026-09', fecha: '2026-09-14', hora: '16:10', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 2.4, CORTO: 0.5 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Yurany Ortiz', entrega_documento: '1.117.534.098', gps: [1.6110, -75.6150], firmas: true, fotos: 0, recibo: 'r-35670' },
    { id: 'v-tn-0922', consecutivo: 1126, cliente: 'c-tinta', periodo: '2026-09', fecha: '2026-09-22', hora: '15:15', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 1.6, CORTO: 0.9 }, bolsas: 1, guardianes: 2, entrega_nombre: 'Kevin Sánchez', entrega_documento: '1.006.834.120', gps: [1.6138, -75.6122], firmas: true, fotos: 0, recibo: 'r-35673' },
    { id: 'v-ram-0902', consecutivo: 1087, cliente: 'c-ramirez', periodo: '2026-09', fecha: '2026-09-02', hora: '08:45', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 2.8, CORTO: 0.7 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Luz Dary Ortega', entrega_documento: '26.590.112', gps: [1.6160, -75.6090], firmas: true, fotos: 0 },
    { id: 'v-oli-0906', consecutivo: 1095, cliente: 'c-olivos', periodo: '2026-09', fecha: '2026-09-06', hora: '07:40', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 6.0, ANATO: 9.7 }, bolsas: 4, guardianes: 0, entrega_nombre: 'Hernán Vargas', entrega_documento: '17.640.871', gps: [1.6190, -75.6120], firmas: true, fotos: 0 },
    { id: 'v-oli-0920', consecutivo: 1120, cliente: 'c-olivos', periodo: '2026-09', fecha: '2026-09-20', hora: '07:35', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 5.4, ANATO: 8.2 }, bolsas: 4, guardianes: 0, entrega_nombre: 'Hernán Vargas', entrega_documento: '17.640.871', gps: [1.6190, -75.6120], firmas: true, fotos: 0 },
    { id: 'v-pe-0909', consecutivo: 1098, cliente: 'c-punto', periodo: '2026-09', fecha: '2026-09-09', hora: '12:30', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 2.2, CORTO: 0.5, TOX: 1.9 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Victoria O.', entrega_documento: '40.077.215', gps: [1.3285, -75.8786], firmas: true, fotos: 0 },
    { id: 'v-pe-0923', consecutivo: 1128, cliente: 'c-punto', periodo: '2026-09', fecha: '2026-09-23', hora: '12:40', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 1.9, CORTO: 0.4, TOX: 2.3 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Victoria O.', entrega_documento: '40.077.215', gps: [1.3285, -75.8786], firmas: true, fotos: 0 },

    // Octubre 2026 (periodo abierto; "hoy" es lunes 19 de octubre)
    { id: 'v-sv-0928', consecutivo: 1135, cliente: 'c-saludvital', periodo: '2026-10', fecha: '2026-09-28', hora: '08:05', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 19.1, CORTO: 2.2 }, bolsas: 5, guardianes: 2, entrega_nombre: 'Enf. Marcela Ruiz', entrega_documento: '1.117.230.118', gps: [1.6152, -75.6113], firmas: true, fotos: 0 },
    { id: 'v-cof-1003', consecutivo: 1140, cliente: 'c-cofema', periodo: '2026-10', fecha: '2026-10-03', hora: '10:05', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 37.8, ANATO: 41.2 }, bolsas: 9, guardianes: 0, entrega_nombre: 'Yesid Calderón', entrega_documento: '96.351.204', gps: [1.6089, -75.6168], firmas: true, fotos: 0 },
    { id: 'v-sv-1005', consecutivo: 1143, cliente: 'c-saludvital', periodo: '2026-10', fecha: '2026-10-05', hora: '08:15', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 17.6, CORTO: 1.9, ANATO: 3.1 }, bolsas: 5, guardianes: 2, entrega_nombre: 'Enf. Marcela Ruiz', entrega_documento: '1.117.230.118', gps: [1.6152, -75.6113], firmas: true, fotos: 0 },
    { id: 'v-lab-1006', consecutivo: 1145, cliente: 'c-labamazonia', periodo: '2026-10', fecha: '2026-10-06', hora: '11:10', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 6.5, CORTO: 1.0, REACT: 3.1 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Bact. Sandra Gómez', entrega_documento: '40.772.310', gps: [1.6201, -75.6049], firmas: true, fotos: 0 },
    { id: 'v-son-1001', consecutivo: 1138, cliente: 'c-sonrisas', periodo: '2026-10', fecha: '2026-10-01', hora: '15:20', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 3.4, CORTO: 0.7 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Dra. Patricia Londoño', entrega_documento: '40.611.029', gps: [1.6145, -75.6101], firmas: true, fotos: 0 },
    { id: 'v-hue-1002', consecutivo: 1139, cliente: 'c-huellas', periodo: '2026-10', fecha: '2026-10-02', hora: '09:40', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 4.9, CORTO: 0.6, ANATO: 5.5, ANIMAL: 3.2 }, bolsas: 4, guardianes: 1, entrega_nombre: 'Dr. Mauricio Trujillo', entrega_documento: '96.190.334', gps: [1.6233, -75.6002], firmas: true, fotos: 0, alerta: 'Incluye 3,2 kg de Animales: categoría sin tratamiento definido' },
    { id: 'v-vs-1002', consecutivo: 1141, cliente: 'c-visionsur', periodo: '2026-10', fecha: '2026-10-02', hora: '14:15', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 9.0, CORTO: 1.1 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Aux. Liliana Peña', entrega_documento: '1.117.401.556', gps: [1.6170, -75.6080], firmas: true, fotos: 0 },
    { id: 'v-vs-1009', consecutivo: 1149, cliente: 'c-visionsur', periodo: '2026-10', fecha: '2026-10-09', hora: '14:05', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 8.6, CORTO: 1.0 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Aux. Liliana Peña', entrega_documento: '1.117.401.556', gps: [1.6170, -75.6080], firmas: true, fotos: 0 },
    { id: 'v-ram-1007', consecutivo: 1146, cliente: 'c-ramirez', periodo: '2026-10', fecha: '2026-10-07', hora: '08:50', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'fallida', estado: 'transmitida', kilos: {}, bolsas: 0, guardianes: 0, motivo_fallida: 'Consultorio cerrado; aviso en la puerta de vacaciones hasta el 13 de octubre', testigo: 'Vigilante del edificio, Julio Castro', gps: [1.6160, -75.6090], firmas: false, fotos: 2 },
    { id: 'v-oli-1004', consecutivo: 1142, cliente: 'c-olivos', periodo: '2026-10', fecha: '2026-10-04', hora: '07:45', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 5.7, ANATO: 10.4 }, bolsas: 4, guardianes: 0, entrega_nombre: 'Hernán Vargas', entrega_documento: '17.640.871', gps: [1.6190, -75.6120], firmas: true, fotos: 0 },
    { id: 'v-pe-1007', consecutivo: 1147, cliente: 'c-punto', periodo: '2026-10', fecha: '2026-10-07', hora: '12:35', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 2.0, CORTO: 0.5, TOX: 2.1 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Victoria O.', entrega_documento: '40.077.215', gps: [1.3285, -75.8786], firmas: true, fotos: 0 },
    { id: 'v-cof-1010', consecutivo: 1150, cliente: 'c-cofema', periodo: '2026-10', fecha: '2026-10-10', hora: '10:20', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 42.1, ANATO: 58.3 }, bolsas: 11, guardianes: 0, entrega_nombre: 'Yesid Calderón', entrega_documento: '96.351.204', gps: [1.6089, -75.6168], firmas: true, fotos: 0 },
    { id: 'v-sv-1012', consecutivo: 1152, cliente: 'c-saludvital', periodo: '2026-10', fecha: '2026-10-12', hora: '08:10', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 18.8, CORTO: 2.3 }, bolsas: 5, guardianes: 2, entrega_nombre: 'Enf. Marcela Ruiz', entrega_documento: '1.117.230.118', gps: [1.6152, -75.6113], firmas: true, fotos: 0 },
    { id: 'v-pv-1012', consecutivo: 1153, cliente: 'c-pielviva', periodo: '2026-10', fecha: '2026-10-12', hora: '16:05', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 2.6, CORTO: 0.4 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Yurany Ortiz', entrega_documento: '1.117.534.098', gps: [1.6110, -75.6150], firmas: true, fotos: 0, recibo: 'r-35686' },
    { id: 'v-vs-1016', consecutivo: 1156, cliente: 'c-visionsur', periodo: '2026-10', fecha: '2026-10-16', hora: '14:10', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 9.8, CORTO: 1.2 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Aux. Liliana Peña', entrega_documento: '1.117.401.556', gps: [1.6170, -75.6080], firmas: true, fotos: 0 },
    { id: 'v-eco-1016', consecutivo: 1157, cliente: 'c-economia', periodo: '2026-10', fecha: '2026-10-16', hora: '16:30', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 2.3, CORTO: 0.5, TOX: 3.1 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Arnulfo Cabrera', entrega_documento: '17.688.452', gps: [1.4877, -75.7236], firmas: true, fotos: 0, recibo: 'r-35687' },
    { id: 'v-nue-1016', consecutivo: 1158, cliente: 'c-nueva', periodo: '2026-10', fecha: '2026-10-16', hora: '17:10', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'rechazada', kilos: { BIO: 1.8, CORTO: 0.3 }, bolsas: 1, guardianes: 1, entrega_nombre: 'Rosalba Murcia', entrega_documento: '26.420.118', gps: [1.6260, -75.5980], firmas: true, fotos: 0, rechazo: 'Cliente creado en campo sin validar: falta dígito de verificación y tarifa. La oficina debe validar el cliente y reprocesar.' },
    { id: 'v-cof-1017', consecutivo: 1186, cliente: 'c-cofema', periodo: '2026-10', fecha: '2026-10-17', hora: '10:12', hora_servidor: '10:14', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 39.9, ANATO: 47.6, RAEES: 12.0 }, bolsas: 10, guardianes: 0, entrega_nombre: 'Yesid Calderón', entrega_documento: '96.351.204', gps: [1.6089, -75.6168], firmas: true, fotos: 1 },
    { id: 'v-oli-1018', consecutivo: 1208, cliente: 'c-olivos', periodo: '2026-10', fecha: '2026-10-18', hora: '07:50', operario: 'op-jesus', auxiliar: 'op-dubeny', placa: 'UQX 904', tipo: 'recoleccion', estado: 'cerrada', kilos: { BIO: 5.2, ANATO: 9.1 }, bolsas: 4, guardianes: 0, entrega_nombre: 'Hernán Vargas', entrega_documento: '17.640.871', gps: [1.6190, -75.6120], firmas: true, fotos: 0, pendiente_desde: '2026-10-18 07:52', intentos: 3, ultimo_error: 'Sin conexión' },
    { id: 'v-lab-1020a', consecutivo: 1154, cliente: 'c-labamazonia', periodo: '2026-10', fecha: '2026-10-13', hora: '11:00', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'anulada', kilos: { BIO: 60.2, CORTO: 1.0, REACT: 2.9 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Bact. Sandra Gómez', entrega_documento: '40.772.310', gps: [1.6201, -75.6049], firmas: true, fotos: 0, anulada_por: 'Lucrecia Quintero', anulada_en: '2026-10-13 15:40', anulacion_motivo: 'Error de digitación: 60,2 kg de biológicos en lugar de 6,2. Se emitió la constancia 1155 en reemplazo.', reemplazo: 'v-lab-1020b' },
    { id: 'v-lab-1020b', consecutivo: 1155, cliente: 'c-labamazonia', periodo: '2026-10', fecha: '2026-10-13', hora: '11:00', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 6.2, CORTO: 1.0, REACT: 2.9 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Bact. Sandra Gómez', entrega_documento: '40.772.310', gps: [1.6201, -75.6049], firmas: true, fotos: 0, reemplaza: 'v-lab-1020a' },
    { id: 'v-sv-1019', consecutivo: null, cliente: 'c-saludvital', periodo: '2026-10', fecha: '2026-10-19', hora: '08:02', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'borrador', kilos: { BIO: 16.4 }, bolsas: 4, guardianes: 0, entrega_nombre: '', entrega_documento: '', gps: [1.6152, -75.6113], firmas: false, fotos: 0 },
  ];

  // Ruta del día (lunes 19 de octubre de 2026) para Dubeny
  const ruta_hoy = [
    { cliente: 'c-saludvital', hora_sugerida: '08:00', estado: 'en_curso' },
    { cliente: 'c-pielviva', hora_sugerida: '09:30', estado: 'pendiente', nota: 'Paga en efectivo' },
    { cliente: 'c-ramirez', hora_sugerida: '10:30', estado: 'pendiente', nota: 'Reprogramada: visita fallida el 7 de octubre' },
    { cliente: 'c-tinta', hora_sugerida: '15:00', estado: 'pendiente', nota: 'Sin visita en octubre; paga en efectivo' },
  ];

  // Recibos de caja (solo efectivo)
  const recibos = [
    { id: 'r-35670', consecutivo: 35670, cliente: 'c-pielviva', visita: 'v-pv-0914', fecha: '2026-09-14', hora: '16:22', operario: 'op-dubeny', valor: 49980, concepto: 'Servicio especial de aseo, agosto de 2026 (factura FVE 25702)', pagador: 'Yurany Ortiz', pagador_documento: '1.117.534.098', estado: 'emitido', conciliado: true },
    { id: 'r-35672', consecutivo: 35672, cliente: 'c-economia', visita: 'v-eco-0918', fecha: '2026-09-18', hora: '16:55', operario: 'op-jesus', valor: 53550, concepto: 'Servicio especial de aseo, agosto de 2026 (factura FVE 25699)', pagador: 'Arnulfo Cabrera', pagador_documento: '17.688.452', estado: 'emitido', conciliado: true },
    { id: 'r-35673', consecutivo: 35673, cliente: 'c-tinta', visita: 'v-tn-0922', fecha: '2026-09-22', hora: '15:28', operario: 'op-dubeny', valor: 47600, concepto: 'Servicio especial de aseo, agosto de 2026 (factura FVE 25710)', pagador: 'Kevin Sánchez', pagador_documento: '1.006.834.120', estado: 'emitido', conciliado: true },
    { id: 'r-35685', consecutivo: 35685, cliente: 'c-tinta', visita: null, fecha: '2026-10-09', hora: '11:40', operario: 'op-dubeny', valor: 47600, concepto: 'Servicio especial de aseo, septiembre de 2026', pagador: 'Kevin Sánchez', pagador_documento: '1.006.834.120', estado: 'anulado', conciliado: false, anulado_por: 'Lucrecia Quintero', anulado_en: '2026-10-09 14:05', anulacion_motivo: 'Valor incorrecto: la factura de septiembre fue $50.337. Se emitió el recibo 35686.' },
    { id: 'r-35686', consecutivo: 35686, cliente: 'c-pielviva', visita: 'v-pv-1012', fecha: '2026-10-12', hora: '16:18', operario: 'op-dubeny', valor: 51408, concepto: 'Servicio especial de aseo, septiembre de 2026 (factura FVE 25781)', pagador: 'Yurany Ortiz', pagador_documento: '1.117.534.098', estado: 'emitido', conciliado: false },
    { id: 'r-35687', consecutivo: 35687, cliente: 'c-economia', visita: 'v-eco-1016', fecha: '2026-10-16', hora: '16:48', operario: 'op-dubeny', valor: 53550, concepto: 'Servicio especial de aseo, septiembre de 2026 (factura FVE 25779)', pagador: 'Arnulfo Cabrera', pagador_documento: '17.688.452', estado: 'emitido', conciliado: false },
  ];

  const actas = [
    { id: 'a-25729', consecutivo: 25729, cliente: 'c-cofema', periodo: '2026-09', fecha: '2026-09-26', estado: 'emitida', aprobada_por: 'Diego A. Cartagena', aprobada_en: '2026-09-26 18:05', publicada: true },
    { id: 'a-25730', consecutivo: 25730, cliente: 'c-saludvital', periodo: '2026-09', fecha: '2026-09-26', estado: 'retenida', aprobada_por: 'Diego A. Cartagena', aprobada_en: '2026-09-26 18:06', publicada: false, retenida_motivo: 'Cliente en mora: factura FVE 25745 vencida el 24 de septiembre' },
  ];

  const auditoria = [
    { en: '2026-10-19 08:02', quien: 'Dubeny Rojas', accion: 'Abrió visita (borrador)', entidad: 'Visita · IPS Salud Vital', detalle: 'Desde el celular Samsung A35' },
    { en: '2026-10-18 07:52', quien: 'Jesús Perdomo', accion: 'Cerró visita 1208 (en el celular)', entidad: 'Visita · Funeraria Los Olivos', detalle: 'Sin señal; en cola de envío' },
    { en: '2026-10-17 16:10', quien: 'Diego A. Cartagena', accion: 'Consultó recaudo del día', entidad: 'Reportes', detalle: '' },
    { en: '2026-10-17 10:14', quien: 'Servidor', accion: 'Transmitida constancia 1186', entidad: 'Visita · Cofema', detalle: 'Hora del celular 10:12, del servidor 10:14' },
    { en: '2026-10-16 17:12', quien: 'Servidor', accion: 'Rechazó visita 1158', entidad: 'Visita · Droguería Nueva Esperanza', detalle: 'Cliente pendiente de validar' },
    { en: '2026-10-16 17:05', quien: 'Dubeny Rojas', accion: 'Creó cliente en campo', entidad: 'Cliente · Droguería Nueva Esperanza', detalle: 'Pendiente de validar por la oficina' },
    { en: '2026-10-13 15:40', quien: 'Lucrecia Quintero', accion: 'Anuló visita 1154', entidad: 'Visita · Laboratorio Amazonía', detalle: 'Motivo: error de digitación (60,2 kg). Reemplazo: 1155' },
    { en: '2026-10-09 14:05', quien: 'Lucrecia Quintero', accion: 'Anuló recibo 35685', entidad: 'Recibo de caja · Tinta Negra', detalle: 'Valor incorrecto' },
    { en: '2026-10-01 07:30', quien: 'Lucrecia Quintero', accion: 'Actualizó cartera desde Excel de Helisa', entidad: 'Cartera', detalle: '12 clientes; 2 en mora' },
    { en: '2026-09-26 18:05', quien: 'Diego A. Cartagena', accion: 'Aprobó y firmó 12 actas', entidad: 'Periodo · Septiembre 2026', detalle: '' },
    { en: '2026-09-26 17:41', quien: 'Lucrecia Quintero', accion: 'Cerró el periodo', entidad: 'Periodo · Septiembre 2026', detalle: '12 clientes, 25 visitas, 640,65 kg; reporte camino A generado' },
  ];

  // --- helpers ----------------------------------------------------------
  const fmtCOP = (n) => '$' + Math.round(n).toLocaleString('es-CO');
  const fmtKg = (n, dec = 2) => (Math.round(n * 100) / 100).toLocaleString('es-CO', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const fmtNum = (n) => Number(n).toLocaleString('es-CO');
  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  function parseISO(s) { const [y, m, d] = s.slice(0, 10).split('-').map(Number); return new Date(y, m - 1, d); }
  function fmtFecha(s, opts = {}) {
    const d = parseISO(s);
    const base = `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;
    return opts.dia ? `${DIAS[d.getDay()]} ${base}` : base;
  }
  function fmtFechaCorta(s) { const d = parseISO(s); return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`; }
  function fmtMes(s) { const d = parseISO(s + (s.length === 7 ? '-01' : '')); return `${MESES[d.getMonth()]} de ${d.getFullYear()}`; }
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const byId = (arr, id) => arr.find((x) => x.id === id);
  const cliente = (id) => byId(clientes, id);
  const operario = (id) => byId(operarios, id);
  const categoria = (codigo) => categorias.find((c) => c.codigo === codigo);
  const dispositor = (id) => byId(dispositores, id);
  const nitCompleto = (c) => c.dv ? `${fmtNum(c.nit)}-${c.dv}` : fmtNum(c.nit);
  const iniciales = (s) => s.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

  function tarifaVigente(c, fecha = HOY) {
    return (c.tarifas || []).find((t) => t.desde <= fecha && (!t.hasta || t.hasta >= fecha)) || null;
  }
  function totalKg(v) { return Object.values(v.kilos || {}).reduce((a, b) => a + b, 0); }
  function visitasDe(clienteId, periodoId, opts = {}) {
    return visitas.filter((v) => v.cliente === clienteId && v.periodo === periodoId && (opts.todas || (v.tipo === 'recoleccion' && v.estado !== 'anulada' && v.estado !== 'borrador' && v.estado !== 'rechazada')));
  }
  // Suma del periodo por categoría para un cliente
  function totalizar(clienteId, periodoId) {
    const vs = visitasDe(clienteId, periodoId);
    const porCat = {};
    categorias.forEach((c) => { porCat[c.codigo] = 0; });
    vs.forEach((v) => Object.entries(v.kilos).forEach(([k, kg]) => { porCat[k] = Math.round((porCat[k] + kg) * 100) / 100; }));
    const kg = Math.round(Object.values(porCat).reduce((a, b) => a + b, 0) * 100) / 100;
    return { visitas: vs, porCat, kg, fallidas: visitas.filter((v) => v.cliente === clienteId && v.periodo === periodoId && v.tipo === 'fallida').length };
  }
  // Fórmula de la factura: (básico + max(0, kg − incluidos) × precio) × (1 + IVA)
  function calcularFactura(tarifa, kg) {
    if (!tarifa) return null;
    const adicionales = Math.max(0, Math.round((kg - tarifa.kg_incluidos) * 100) / 100);
    const valorAdicionales = Math.round(adicionales * tarifa.precio_kg);
    const subtotal = tarifa.basico + valorAdicionales;
    const iva = Math.round(subtotal * tarifa.iva_pct / 100);
    return { kg, incluidos: tarifa.kg_incluidos, adicionales, precio_kg: tarifa.precio_kg, basico: tarifa.basico, valorAdicionales, subtotal, iva_pct: tarifa.iva_pct, iva, total: subtotal + iva };
  }
  function cierreCliente(clienteId, periodoId) {
    const c = cliente(clienteId); const p = byId(periodos, periodoId);
    const t = totalizar(clienteId, periodoId);
    const tarifa = tarifaVigente(c, p.fin);
    return { cliente: c, periodo: p, ...t, tarifa, factura: calcularFactura(tarifa, t.kg) };
  }
  function cierrePeriodo(periodoId) {
    return clientes.filter((c) => c.estado === 'activo').map((c) => cierreCliente(c.id, periodoId));
  }

  // Número a letras (pesos colombianos), suficiente para recibos
  function numeroALetras(n) {
    n = Math.round(n);
    const U = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
    const D = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const C = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
    function cientos(x) {
      if (x === 0) return '';
      if (x === 100) return 'cien';
      let s = C[Math.floor(x / 100)];
      const r = x % 100;
      if (r < 30) s += (s ? ' ' : '') + U[r];
      else s += (s ? ' ' : '') + D[Math.floor(r / 10)] + (r % 10 ? ' y ' + U[r % 10] : '');
      return s.trim();
    }
    function miles(x) {
      if (x < 1000) return cientos(x);
      const m = Math.floor(x / 1000), r = x % 1000;
      return (m === 1 ? 'mil' : cientos(m) + ' mil') + (r ? ' ' + cientos(r) : '');
    }
    function millones(x) {
      if (x < 1e6) return miles(x);
      const m = Math.floor(x / 1e6), r = x % 1e6;
      return (m === 1 ? 'un millón' : miles(m) + ' millones') + (r ? ' ' + miles(r) : '');
    }
    return cap(millones(n)) + ' pesos M/CTE';
  }

  // Firma manuscrita simulada (SVG determinista por semilla)
  function firmaSVG(seed, color = '#1b2a66') {
    let h = 0; for (const ch of String(seed)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const rnd = () => { h = (h * 1664525 + 1013904223) >>> 0; return h / 4294967296; };
    let d = `M 10 ${30 + rnd() * 10}`;
    let x = 10;
    while (x < 170) {
      const x1 = x + 8 + rnd() * 14, y1 = 8 + rnd() * 44, x2 = x1 + 6 + rnd() * 12, y2 = 8 + rnd() * 44, x3 = x2 + 4 + rnd() * 10, y3 = 20 + rnd() * 24;
      d += ` C ${x1.toFixed(1)} ${y1.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}, ${x3.toFixed(1)} ${y3.toFixed(1)}`;
      x = x3;
    }
    return `<svg class="sig" viewBox="0 0 190 60" xmlns="http://www.w3.org/2000/svg" aria-label="Firma"><path d="${d}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  // QR simulado (patrón determinista) para la verificación por hash
  function qrSVG(seed, size = 64) {
    let h = 0; for (const ch of String(seed)) h = (h * 33 + ch.charCodeAt(0)) >>> 0;
    const n = 21; let cells = '';
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const finder = (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
      let on;
      if (finder) { const fx = x % (n - 7) < 7 ? x % (n - 7) : x, fy = y % (n - 7) < 7 ? y % (n - 7) : y; const ex = x >= n - 7 ? x - (n - 7) : x, ey = y >= n - 7 ? y - (n - 7) : y; on = ex === 0 || ex === 6 || ey === 0 || ey === 6 || (ex >= 2 && ex <= 4 && ey >= 2 && ey <= 4); }
      else { h = (h * 1103515245 + 12345) >>> 0; on = (h >>> 16) & 1; }
      if (on) cells += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }
    return `<svg class="qr" viewBox="0 0 ${n} ${n}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" aria-label="Código QR de verificación"><rect width="${n}" height="${n}" fill="#fff"/><g fill="#111">${cells}</g></svg>`;
  }
  function hashFake(seed) {
    let h1 = 0x811c9dc5, h2 = 0x01000193;
    for (const ch of String(seed)) { h1 = Math.imul(h1 ^ ch.charCodeAt(0), 16777619) >>> 0; h2 = Math.imul(h2 ^ ch.charCodeAt(0), 2246822519) >>> 0; }
    return (h1.toString(16).padStart(8, '0') + h2.toString(16).padStart(8, '0') + (h1 ^ h2).toString(16).padStart(8, '0') + ((h1 + h2) >>> 0).toString(16).padStart(8, '0')).slice(0, 32);
  }
  function consecutivoPlanilla(n, fecha) { return parametros.formato_planilla.replace('{n}', n).replace('{yy}', fecha.slice(2, 4)); }
  function pad(n, w = 6) { return String(n).padStart(w, '0'); }

  // Barra superior común de los mockups
  function mockBar(active) {
    const links = [
      ['../index.html', 'Inicio'],
      ['../app/index.html', 'App móvil'],
      ['../panel/index.html', 'Panel web'],
      ['../documentos/index.html', 'Documentos PDF'],
      ['../portal/index.html', 'Portal (fase 2)'],
    ];
    return `<div class="mock-bar no-print"><span class="tag">MOCKUP · FASE 1</span><span>RH digital Comserva · datos de prueba · hoy: ${fmtFecha(HOY, { dia: true })}</span><span class="spacer"></span><nav>${links.map(([h, t]) => `<a href="${h}"${t === active ? ' style="color:#fff;font-weight:700;text-decoration:underline"' : ''}>${t}</a>`).join('')}</nav></div>`;
  }

  return {
    HOY, empresa, parametros, dispositores, categorias, operarios, vehiculos, usuarios, clientes, periodos, visitas, ruta_hoy, recibos, actas, auditoria,
    ROL_LABEL, FRECUENCIA_LABEL, CARTERA_LABEL, ESTADO_VISITA_LABEL, MESES, DIAS,
    fmtCOP, fmtKg, fmtNum, fmtFecha, fmtFechaCorta, fmtMes, cap, parseISO, byId, cliente, operario, categoria, dispositor, nitCompleto, iniciales,
    tarifaVigente, totalKg, visitasDe, totalizar, calcularFactura, cierreCliente, cierrePeriodo, numeroALetras, firmaSVG, qrSVG, hashFake, consecutivoPlanilla, pad, mockBar,
  };
})();
