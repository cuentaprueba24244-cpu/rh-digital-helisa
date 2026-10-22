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
    { id: 'c-nueva', nit: '1117211340', dv: '', razon_social: 'Droguería Nueva Esperanza', nombre_comercial: 'Droguería Nueva Esperanza', sede: 'Local', direccion: 'Barrio Las Malvinas, manzana C casa 12', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Doña Rosalba', telefono: '320 110 4456', whatsapp: '320 110 4456', email: '', frecuencia: 'mensual', dia_visita: '', estado: 'pendiente_validar', existe_en_helisa: false, cartera: 'sin_info', cartera_fuente: '', creado: '2026-10-16', creado_por: 'Dubeny Rojas (en campo)',
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
    { en: '2026-10-10 11:20', quien: 'Lucrecia Quintero', accion: 'Marcó pago por transferencia', entidad: 'Factura · Visión Sur FVE 25766', detalle: 'Bancolombia ref. 884120; solo saldo de referencia' },
    { en: '2026-09-29 10:12', quien: 'Lucrecia Quintero', accion: 'Registró recibos definitivos RC 8812–8814', entidad: 'Archivo plano · COMSERVA_RC_2026-09_001', detalle: 'Cruce hecho en Helisa por DOC FUENTE' },
    { en: '2026-09-29 09:50', quien: 'Lucrecia Quintero', accion: 'Generó archivo plano RC', entidad: 'Archivo plano · COMSERVA_RC_2026-09_001', detalle: '3 recibos entregados; plantilla RC v1' },
    { en: '2026-09-28 09:40', quien: 'Lucrecia Quintero', accion: 'Registró 12 facturas (FVE 25756–25767)', entidad: 'Periodo · Septiembre 2026', detalle: 'Cierres → facturados; archivo FV 002 → importado' },
    { en: '2026-09-27 09:05', quien: 'Lucrecia Quintero', accion: 'Generó archivo plano FV (002)', entidad: 'Archivo plano · COMSERVA_FV_2026-09_002', detalle: '12 RH; plantilla FV v1' },
    { en: '2026-09-27 08:20', quien: 'Lucrecia Quintero', accion: 'Marcó archivo FV 001 como rechazado', entidad: 'Archivo plano · COMSERVA_FV_2026-09_001', detalle: 'Helisa: 2 terceros no existen' },
    { en: '2026-09-26 18:05', quien: 'Diego A. Cartagena', accion: 'Aprobó y firmó 12 actas', entidad: 'Periodo · Septiembre 2026', detalle: '' },
    { en: '2026-09-26 17:41', quien: 'Lucrecia Quintero', accion: 'Cerró el periodo', entidad: 'Periodo · Septiembre 2026', detalle: '12 clientes, 25 visitas, 640,65 kg; 12 RH generados' },
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


  // =====================================================================
  // v5 · Facturas registradas, recibos con aplicación, plantillas y archivos planos
  // =====================================================================
  const TIPO_RECIBO_LABEL = { anticipo: 'Anticipo', abono: 'Abono', pago_factura: 'Pago de factura', pago_total: 'Pago total de cartera' };
  const ESTADO_RECIBO_LABEL = { emitido: 'Emitido', entregado: 'Entregado en oficina', exportado: 'Exportado', cruzado: 'Cruzado en Helisa', anulado: 'Anulado' };
  const ESTADO_PLANO_LABEL = { generado: 'Generado', descargado: 'Descargado', importado: 'Importado en Helisa', rechazado: 'Rechazado por Helisa', anulado: 'Anulado' };
  const ESTADO_CIERRE_LABEL = { abierto: 'Abierto', cerrado: 'Cerrado', exportado: 'Exportado', facturado: 'Facturado' };

  function sumarDias(s, n) { const d = parseISO(s); d.setDate(d.getDate() + n); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

  // Facturas registradas (FVE que Lucrecia devuelve después de importar el archivo FV).
  // Agosto: anteriores al sistema (solo para que los recibos de septiembre apliquen a algo).
  const facturas = [
    { id: 'f-25699', numero: 'FVE 25699', cliente: 'c-economia', periodo: '2026-08', fecha: '2026-08-26', vence: '2026-08-26', total: 53550, pagada_otro_medio: 0, origen: 'Helisa (antes del sistema)' },
    { id: 'f-25702', numero: 'FVE 25702', cliente: 'c-pielviva', periodo: '2026-08', fecha: '2026-08-26', vence: '2026-08-26', total: 49980, pagada_otro_medio: 0, origen: 'Helisa (antes del sistema)' },
    { id: 'f-25710', numero: 'FVE 25710', cliente: 'c-tinta', periodo: '2026-08', fecha: '2026-08-26', vence: '2026-08-26', total: 47600, pagada_otro_medio: 0, origen: 'Helisa (antes del sistema)' },
    { id: 'f-25745', numero: 'FVE 25745', cliente: 'c-saludvital', periodo: '2026-08', fecha: '2026-08-25', vence: '2026-09-24', total: 207298, pagada_otro_medio: 0, origen: 'Helisa (antes del sistema)' },
  ];
  // Septiembre: una por cliente activo, con el total que da el cierre (Cofema = FVE 25756 real).
  (function () {
    let n = 25757;
    const p = byId(periodos, '2026-09');
    clientes.filter((c) => c.estado === 'activo').forEach((c) => {
      const f = cierreCliente(c.id, p.id).factura; if (!f) return;
      const t = tarifaVigente(c, p.fin);
      const plazo = /30/.test(t.plazo) ? 30 : (/10/.test(t.plazo) ? 14 : 0);
      const esCofema = c.id === 'c-cofema';
      const fecha = esCofema ? '2026-09-23' : '2026-09-27';
      facturas.push({ id: 'f-' + (esCofema ? 25756 : n), numero: 'FVE ' + (esCofema ? 25756 : n), cliente: c.id, periodo: p.id, fecha, vence: sumarDias(fecha, plazo), total: f.total, pagada_otro_medio: 0, origen: 'Pedido importado · COMSERVA_PED_2026-09_002 · factura hecha en Helisa', archivo: 'ap-ped-2026-09-002', registrada_por: 'Lucrecia Quintero', registrada_en: '2026-09-28 09:40' });
      if (!esCofema) n++;
    });
    // Pago por transferencia marcado por Facturación (solo para el saldo de referencia): Visión Sur pagó septiembre.
    const vs = facturas.find((f) => f.cliente === 'c-visionsur' && f.periodo === '2026-09'); if (vs) { vs.pagada_otro_medio = vs.total; vs.pago_otro_medio_nota = 'Transferencia Bancolombia ref. 884120 · 10 oct 2026'; }
  })();
  const factura = (id) => byId(facturas, id);
  const facturaDe = (clienteId, periodoId) => facturas.find((f) => f.cliente === clienteId && f.periodo === periodoId) || null;

  // Recibos: tipo, aplicación a facturas y estados de la v5 (emitido → entregado → exportado → cruzado; anulado)
  (function () {
    const ap = (rid, fid, valor, extra) => { const r = byId(recibos, rid); Object.assign(r, { aplicaciones: [{ factura: fid, valor }], ...extra }); };
    ap('r-35670', 'f-25702', 49980, { tipo: 'pago_factura', estado: 'cruzado', entregado_en: '2026-09-15 07:40', archivo: 'ap-rc-2026-09-001', recibo_helisa: 'RC 8812', recibo_helisa_fecha: '2026-09-29', cruzado_en: '2026-09-29 10:12', conciliado: true });
    ap('r-35672', 'f-25699', 53550, { tipo: 'pago_factura', estado: 'cruzado', entregado_en: '2026-09-19 07:35', archivo: 'ap-rc-2026-09-001', recibo_helisa: 'RC 8813', recibo_helisa_fecha: '2026-09-29', cruzado_en: '2026-09-29 10:12', conciliado: true });
    ap('r-35673', 'f-25710', 47600, { tipo: 'pago_factura', estado: 'cruzado', entregado_en: '2026-09-23 07:30', archivo: 'ap-rc-2026-09-001', recibo_helisa: 'RC 8814', recibo_helisa_fecha: '2026-09-29', cruzado_en: '2026-09-29 10:12', conciliado: true });
    const fpv = facturaDe('c-pielviva', '2026-09'), feco = facturaDe('c-economia', '2026-09'), ftn = facturaDe('c-tinta', '2026-09');
    const r86 = byId(recibos, 'r-35686'); r86.valor = fpv.total; r86.concepto = `Pago de factura ${fpv.numero} · septiembre de 2026`; ap('r-35686', fpv.id, fpv.total, { tipo: 'pago_factura', estado: 'entregado', entregado_en: '2026-10-13 07:45', conciliado: false });
    const r87 = byId(recibos, 'r-35687'); r87.valor = 30000; r87.concepto = `Abono a la factura ${feco.numero} · septiembre de 2026`; ap('r-35687', feco.id, 30000, { tipo: 'abono', estado: 'emitido', conciliado: false });
    const r85 = byId(recibos, 'r-35685'); r85.valor = 47600; r85.concepto = `Pago de factura ${ftn.numero} · septiembre de 2026`; r85.anulacion_motivo = `Valor incorrecto: la factura de septiembre fue ${fmtCOP(ftn.total)}. El operario debe emitir un recibo nuevo.`; Object.assign(r85, { tipo: 'pago_factura', aplicaciones: [{ factura: ftn.id, valor: 47600 }], conciliado: false });
  })();

  // Saldo de referencia por factura: total − recibos vigentes − pagos por otro medio. No es la cartera contable (esa vive en Helisa).
  function saldoReferencia(facturaId, extraRecibos = []) {
    const f = factura(facturaId); if (!f) return 0;
    const rs = recibos.concat(extraRecibos).filter((r) => r.estado !== 'anulado' && (r.aplicaciones || []).some((a) => a.factura === facturaId));
    const pagado = rs.reduce((a, r) => a + r.aplicaciones.filter((x) => x.factura === facturaId).reduce((s, x) => s + x.valor, 0), 0);
    return Math.max(0, f.total - pagado - (f.pagada_otro_medio || 0));
  }
  function facturasConSaldo(clienteId, extraRecibos = []) {
    return facturas.filter((f) => f.cliente === clienteId).map((f) => ({ ...f, saldo: saldoReferencia(f.id, extraRecibos), vencida: f.vence < HOY })).filter((f) => f.saldo > 0).sort((a, b) => a.fecha.localeCompare(b.fecha));
  }
  const clienteTieneFactura = (clienteId) => facturas.some((f) => f.cliente === clienteId);

  // Cartilla de servicios de Helisa (propuesta A: van en el pedido; B: en el asiento) y código de cliente
  const SERVICIOS_HELISA = { basico: { codigo: 'SRV-BASICO', nombre: 'Recolección, transporte y disposición final de residuos (básico mensual)', lista: '1', cuenta_f: '413550', cuenta_n: '41205500506' }, kg: { codigo: 'SRV-KG', nombre: 'Kilogramos adicionales', lista: '1', cuenta_f: '413550', cuenta_n: '41205500506' } };
  clientes.forEach((c) => { c.codigo_helisa = c.existe_en_helisa === false ? '' : c.nit; });

  // Catálogo de campos exportables (HEL-07)
  const CAMPOS_PLANO = [
    ['plantilla.tipo_documento', 'Tipo de documento de la plantilla', 'FE'], ['pedido.numero', 'Número del pedido (RH sin guion)', '2269026'], ['pedido.tipo_linea', 'Tipo de línea del pedido: 2 servicio, 3 comentario', '2'], ['cliente.codigo_helisa', 'Código del cliente o de la sede en Helisa', '891190218'], ['servicio.codigo', 'Código del servicio en la cartilla de Helisa', 'SRV-KG'], ['servicio.lista_precios', 'Lista de precios de Helisa', '1'], ['linea.cantidad', 'Cantidad de la línea (1 o kilos adicionales)', '393,85'], ['linea.valor_unitario', 'Valor unitario (básico o precio del kilo)', '4600'], ['linea.total', 'Cantidad × valor unitario', '1811710'], ['factura.numero', 'Número de la factura emitida (B)', 'CSV 1'], ['factura.cufe', 'CUFE devuelto por la DIAN (B)', '8f2a…'], ['plantilla.centro_costo', 'Centro de costo de la plantilla', ''],
    ['documento.fecha', 'Fecha del documento (RH: fecha sugerida; recibo: fecha del recibo)', '25/09/2026'], ['documento.numero', 'Número del documento (vacío si Helisa lo asigna)', ''],
    ['documento.doc_fuente', 'Prefijo + número propio (FV) o número FVE aplicado (RC)', 'FVE25756'], ['documento.forma_pago', 'Código de forma de pago según la tarifa', '6'],
    ['cliente.nit', 'NIT del cliente sin puntos', '891190218'], ['cliente.dv', 'Dígito de verificación', '5'], ['cliente.razon_social_helisa', 'Razón social según Helisa', 'COFEMA S.A.'],
    ['periodo.nombre', 'Nombre del periodo', 'SEPTIEMBRE 2026'], ['rh.numero', 'Número de la planilla (RH)', '22690-26'], ['rh.kg_total', 'Kilos del periodo', '413,85'], ['rh.kg_adicionales', 'Kilos adicionales', '393,85'],
    ['rh.precio_kg', 'Precio del kilo adicional', '4600'], ['rh.basico', 'Valor básico', '74790'], ['rh.valor_adicionales', 'Valor de los kilos adicionales', '1811710'], ['rh.subtotal', 'Subtotal', '1886500'], ['rh.iva_pct', 'IVA %', '19'], ['rh.iva', 'IVA', '358435'], ['rh.total', 'Total', '2244935'],
    ['recibo.numero', 'Número del recibo provisional', '35672'], ['recibo.tipo', 'Tipo de recibo', 'ABONO'], ['recibo.valor', 'Valor total del recibo', '500000'], ['recibo.medio', 'Medio de pago', 'EFECTIVO'],
    ['aplicacion.factura_numero', 'Número FVE de la factura aplicada', 'FVE25756'], ['aplicacion.valor', 'Valor aplicado a esa factura', '500000'],
    ['linea.cuenta', 'Cuenta contable de la línea', '130505'], ['linea.concepto', 'Concepto de la línea', 'KILOGRAMOS ADICIONALES'], ['linea.valor', 'Valor de la línea', '2244935'], ['linea.naturaleza', 'D o C', 'D'], ['linea.base', 'Base (subtotal en la línea de IVA)', '1886500'], ['linea.clase', 'F o N', 'F'], ['linea.orden', 'Número de línea dentro del documento', '4'],
  ].map(([clave, descripcion, ejemplo]) => ({ clave, descripcion, ejemplo }));

  // Las 22 columnas del CSV de Helisa, en su orden y con sus títulos (incluidas las erratas del archivo real)
  const COLUMNAS_HELISA = [
    ['TIPO', 'campo', 'plantilla.tipo_documento'], ['FECHA', 'campo', 'documento.fecha'], ['NUMERO DE DOCUEMNTO', 'campo', 'documento.numero'], ['CUENTA', 'campo', 'linea.cuenta'],
    ['CONCEPTO', 'campo', 'linea.concepto'], ['CENTRO', 'campo', 'plantilla.centro_costo'], ['VALOR', 'campo', 'linea.valor'], ['NATURALEZA', 'campo', 'linea.naturaleza'],
    ['IDENTIDADTERCERO', 'campo', 'cliente.nit'], ['DOC FUENTE', 'campo', 'documento.doc_fuente'], ['CODIGO NEGOCIO', 'vacio', ''], ['NOMBRE NEGOCIO', 'vacio', ''], ['NRO CHEQE', 'vacio', ''],
    ['CODIGO TERCERO', 'vacio', ''], ['CUENTA BANCARIO', 'vacio', ''], ['ID PROVEEDOR/COBRADOR', 'vacio', ''], ['FORMA DE PAGO', 'campo', 'documento.forma_pago'], ['BASE', 'campo', 'linea.base'],
    ['NUM OPERACION', 'vacio', ''], ['FECHA DE CHEUQE', 'vacio', ''], ['CLASE DE MOVIMIENTO', 'campo', 'linea.clase'], ['IND A AFECTAR', 'campo', 'linea.orden'],
  ].map(([titulo, origen, campo], i) => ({ orden: i + 1, titulo, origen, campo, constante: '' }));
  const colsHelisa = () => COLUMNAS_HELISA.map((c) => ({ ...c }));

  const plantillas_plano = [
    { id: 'pl-ped-1', tipo: 'PED', version: 1, nombre: 'Pedido de Helisa (estructura mostrada por Julio)', estado: 'aprobada', vigente_desde: '2026-10-15', aprobada_por: 'Diego A. Cartagena', aprobada_en: '2026-10-15 10:00', creada_por: 'Hernando (equipo)', creada_en: '2026-10-21', nota_cambio: 'Columnas del pedido tal como Julio las mostró el 21 de octubre: tipo de documento, número, fecha, identificación y código del cliente, tipo de línea (2 servicio, 3 comentario), código del servicio, descripción, lista de precios, cantidad, valor unitario y total. Títulos definitivos pendientes del Excel de Julio.',
      formato: 'txt', separador: ';', codificacion: 'windows-1252', con_titulos: false, formato_fecha: 'dd/MM/yyyy', decimales: 2, separador_decimal: ',', mayusculas: true, quitar_tildes: true, tipo_documento: 'PED', centro_costo: '', prefijo_doc_fuente: '', nit_con_dv: false, agrupacion: 'periodo', prefijo_archivo: 'COMSERVA', valida_cuadre: false, valida_tercero: true, valida_fve: false,
      columnas: [['TIPO DOCUMENTO', 'campo', 'plantilla.tipo_documento'], ['NUMERO PEDIDO', 'campo', 'pedido.numero'], ['FECHA', 'campo', 'documento.fecha'], ['IDENTIFICACION CLIENTE', 'campo', 'cliente.nit'], ['CODIGO CLIENTE', 'campo', 'cliente.codigo_helisa'], ['TIPO LINEA', 'campo', 'pedido.tipo_linea'], ['CODIGO SERVICIO', 'campo', 'servicio.codigo'], ['DESCRIPCION', 'campo', 'linea.concepto'], ['LISTA PRECIOS', 'campo', 'servicio.lista_precios'], ['CANTIDAD', 'campo', 'linea.cantidad'], ['VALOR UNITARIO', 'campo', 'linea.valor_unitario'], ['TOTAL', 'campo', 'linea.total']].map(([titulo, origen, campo], i) => ({ orden: i + 1, titulo, origen, campo, constante: '' })),
      lineas: [
        { orden: 1, tipo: 'ingreso_basico', clase: 'F', cuenta: 'SRV-BASICO', naturaleza: 'C', concepto: 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS {periodo.nombre}', base: false, tercero: true, omitir_cero: false },
        { orden: 2, tipo: 'ingreso_adicionales', clase: 'F', cuenta: 'SRV-KG', naturaleza: 'C', concepto: 'KILOGRAMOS ADICIONALES', base: false, tercero: true, omitir_cero: true },
        { orden: 3, tipo: 'otra', clase: 'F', cuenta: '', naturaleza: 'C', concepto: 'SERVICIO ESPECIAL DE ASEO PRESTADO MES DE {periodo.nombre}', base: false, tercero: false, omitir_cero: false },
      ] },
    { id: 'pl-asi-1', tipo: 'ASI', version: 1, nombre: 'Asiento de factura · espejo del CSV de Helisa (22 columnas)', estado: 'aprobada', vigente_desde: '2026-09-20', aprobada_por: 'Diego A. Cartagena', aprobada_en: '2026-09-20 16:30', creada_por: 'Hernando (equipo)', creada_en: '2026-09-15', nota_cambio: 'Propuesta B: asiento contable de cada factura emitida por el sistema (ingreso, IVA, cartera), construido sobre HELISA_900855539_20261002_132210_plano.csv. Cuentas de ejemplo del contador.',
      formato: 'xls', separador: ';', codificacion: 'windows-1252', con_titulos: true, formato_fecha: 'dd/MM/yyyy', decimales: 0, separador_decimal: ',', mayusculas: true, quitar_tildes: true, tipo_documento: 'FE', centro_costo: '', prefijo_doc_fuente: 'FV', nit_con_dv: false, agrupacion: 'periodo', prefijo_archivo: 'COMSERVA', valida_cuadre: true, valida_tercero: true, valida_fve: true,
      columnas: colsHelisa(),
      lineas: [
        { orden: 1, tipo: 'ingreso_basico', clase: 'F', cuenta: '413550', naturaleza: 'C', concepto: 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS {periodo.nombre}', base: false, tercero: true, omitir_cero: false },
        { orden: 2, tipo: 'ingreso_adicionales', clase: 'F', cuenta: '413550', naturaleza: 'C', concepto: 'KILOGRAMOS ADICIONALES {rh.kg_adicionales} KG X {rh.precio_kg}', base: false, tercero: true, omitir_cero: true },
        { orden: 3, tipo: 'iva', clase: 'F', cuenta: '240805', naturaleza: 'C', concepto: 'IVA {rh.iva_pct}%', base: true, tercero: true, omitir_cero: true },
        { orden: 4, tipo: 'cartera', clase: 'F', cuenta: '130505', naturaleza: 'D', concepto: 'FACTURA {documento.doc_fuente} {cliente.razon_social_helisa}', base: false, tercero: true, omitir_cero: false },
      ] },
    { id: 'pl-asi-2', tipo: 'ASI', version: 2, nombre: 'Con filas NIIF (clase N) y centro de costo', estado: 'borrador', vigente_desde: '', aprobada_por: '', aprobada_en: '', creada_por: 'Lucrecia Quintero', creada_en: '2026-10-15', nota_cambio: 'Dos libros (Julio, 21 oct): cada línea repetida con clase N y las cuentas del libro tributario; centro de costo 01 Florencia. Pendiente de probar con Cofema y aprobar.',
      formato: 'xls', separador: ';', codificacion: 'windows-1252', con_titulos: true, formato_fecha: 'dd/MM/yyyy', decimales: 0, separador_decimal: ',', mayusculas: true, quitar_tildes: true, tipo_documento: 'FE', centro_costo: '01', prefijo_doc_fuente: 'FV', nit_con_dv: false, agrupacion: 'periodo', prefijo_archivo: 'COMSERVA', valida_cuadre: true, valida_tercero: true, valida_fve: true,
      columnas: colsHelisa(),
      lineas: [
        { orden: 1, tipo: 'ingreso_basico', clase: 'F', cuenta: '413550', naturaleza: 'C', concepto: 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS {periodo.nombre}', base: false, tercero: true, omitir_cero: false },
        { orden: 2, tipo: 'ingreso_adicionales', clase: 'F', cuenta: '413550', naturaleza: 'C', concepto: 'KILOGRAMOS ADICIONALES {rh.kg_adicionales} KG X {rh.precio_kg}', base: false, tercero: true, omitir_cero: true },
        { orden: 3, tipo: 'iva', clase: 'F', cuenta: '240805', naturaleza: 'C', concepto: 'IVA {rh.iva_pct}%', base: true, tercero: true, omitir_cero: true },
        { orden: 4, tipo: 'cartera', clase: 'F', cuenta: '130505', naturaleza: 'D', concepto: 'FACTURA {documento.doc_fuente} {cliente.razon_social_helisa}', base: false, tercero: true, omitir_cero: false },
        { orden: 5, tipo: 'ingreso_basico', clase: 'N', cuenta: '41205500506', naturaleza: 'C', concepto: 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS {periodo.nombre}', base: false, tercero: true, omitir_cero: false },
        { orden: 6, tipo: 'ingreso_adicionales', clase: 'N', cuenta: '41205500506', naturaleza: 'C', concepto: 'KILOGRAMOS ADICIONALES {rh.kg_adicionales} KG X {rh.precio_kg}', base: false, tercero: true, omitir_cero: true },
        { orden: 7, tipo: 'iva', clase: 'N', cuenta: '212200501', naturaleza: 'C', concepto: 'IVA {rh.iva_pct}%', base: true, tercero: true, omitir_cero: true },
        { orden: 8, tipo: 'cartera', clase: 'N', cuenta: '112050502', naturaleza: 'D', concepto: 'FACTURA {documento.doc_fuente} {cliente.razon_social_helisa}', base: false, tercero: true, omitir_cero: false },
      ] },
    { id: 'pl-rc-1', tipo: 'RC', version: 1, nombre: 'Recibo de caja · movimiento contable, dos libros', estado: 'aprobada', vigente_desde: '2026-09-20', aprobada_por: 'Diego A. Cartagena', aprobada_en: '2026-09-20 16:32', creada_por: 'Hernando (equipo)', creada_en: '2026-09-15', nota_cambio: 'DOC FUENTE lleva el número FVE para que Helisa cruce el pago contra la factura.',
      formato: 'xls', separador: ';', codificacion: 'windows-1252', con_titulos: true, formato_fecha: 'dd/MM/yyyy', decimales: 0, separador_decimal: ',', mayusculas: true, quitar_tildes: true, tipo_documento: 'RC', centro_costo: '', prefijo_doc_fuente: 'FVE', nit_con_dv: false, agrupacion: 'periodo', recibos_incluidos: 'entregados', prefijo_archivo: 'COMSERVA', valida_cuadre: true, valida_tercero: true, valida_fve: true,
      columnas: colsHelisa(),
      lineas: [
        { orden: 1, tipo: 'caja', clase: 'F', cuenta: '110505', naturaleza: 'D', concepto: 'RECIBO PROVISIONAL {recibo.numero} {recibo.tipo}', base: false, tercero: true, omitir_cero: false },
        { orden: 2, tipo: 'cartera', clase: 'F', cuenta: '130505', naturaleza: 'C', concepto: 'ABONO A {aplicacion.factura_numero}', base: false, tercero: true, omitir_cero: false },
        { orden: 3, tipo: 'caja', clase: 'N', cuenta: '110505001', naturaleza: 'D', concepto: 'RECIBO PROVISIONAL {recibo.numero} {recibo.tipo}', base: false, tercero: true, omitir_cero: false },
        { orden: 4, tipo: 'cartera', clase: 'N', cuenta: '130505001', naturaleza: 'C', concepto: 'ABONO A {aplicacion.factura_numero}', base: false, tercero: true, omitir_cero: false },
      ] },
    { id: 'pl-ter-1', tipo: 'TER', version: 1, nombre: 'Cartilla de terceros (fase 2)', estado: 'borrador', vigente_desde: '', aprobada_por: '', aprobada_en: '', creada_por: 'Hernando (equipo)', creada_en: '2026-10-18', nota_cambio: 'Pendiente: títulos de la cartilla de terceros de Helisa.',
      formato: 'xls', separador: ';', codificacion: 'windows-1252', con_titulos: true, formato_fecha: 'dd/MM/yyyy', decimales: 0, separador_decimal: ',', mayusculas: true, quitar_tildes: true, tipo_documento: '', centro_costo: '', prefijo_doc_fuente: '', nit_con_dv: true, agrupacion: 'lote', prefijo_archivo: 'COMSERVA', valida_cuadre: false, valida_tercero: false, valida_fve: false,
      columnas: [['IDENTIDAD', 'campo', 'cliente.nit'], ['DV', 'campo', 'cliente.dv'], ['CLASE DOC', 'constante', '', 'NIT'], ['NOMBRE', 'campo', 'cliente.razon_social_helisa'], ['NATURALEZA', 'constante', '', 'JURIDICA'], ['DIRECCION', 'campo', 'cliente.direccion'], ['TELEFONO', 'campo', 'cliente.telefono'], ['CIUDAD', 'campo', 'cliente.ciudad'], ['CORREO', 'campo', 'cliente.email']].map(([titulo, origen, campo, constante], i) => ({ orden: i + 1, titulo, origen, campo, constante: constante || '' })),
      lineas: [] },
  ];
  const plantillaVigente = (tipo) => plantillas_plano.filter((p) => p.tipo === tipo && p.estado === 'aprobada' && p.vigente_desde <= HOY).sort((a, b) => b.vigente_desde.localeCompare(a.vigente_desde))[0] || null;

  // Propuesta B · facturación electrónica en el sistema (Factus, sandbox) ------------------------
  const proveedor_fe = {
    nombre: 'Factus (FACTUS S.A.S.)', entorno: 'sandbox', url: 'https://api-sandbox.factus.com.co', client_id: 'cs-••••••••', usuario: 'facturacion@comserva.com.co', token_vence: '2026-10-19 09:40',
    rango: { id: 389, prefijo: 'CSV', desde: 1, hasta: 2000, siguiente: 15, resolucion: '18764000001234', vigente_desde: '2026-10-01', vigente_hasta: '2028-09-30', ambiente: 'pruebas' },
    suscripcion: { grupo: 'Facturación electrónica', total: 200, consumidos: 14, vence: '2027-10-15', activa: true },
    certificado: { titular: 'Comserva S.A.S.', vence: '2027-10-15' },
    dian_verificado: false,
  };
  const facturas_fe = [
    { id: 'fe-cof-09', cliente: 'c-cofema', periodo: '2026-09', numero: 'CSV 1', reference_code: 'cierre-2026-09-c-cofema', cufe: hashFake('cufe-cofema-09') + hashFake('x'), estado: 'validada', fecha: '2026-09-26', validada_en: '2026-09-26 17:42', total: 2244935, notificaciones: [], pdf: true, xml: true, enviado_correo: true, asiento: 'ap-asi-2026-09-001' },
    { id: 'fe-sv-09', cliente: 'c-saludvital', periodo: '2026-09', numero: 'CSV 2', reference_code: 'cierre-2026-09-c-saludvital', cufe: hashFake('cufe-sv-09') + hashFake('y'), estado: 'con_notificaciones', fecha: '2026-09-26', validada_en: '2026-09-26 17:42', total: 0, notificaciones: ['FAJ44b: Dirección del adquiriente sin número de vía; la DIAN la aceptó con advertencia'], pdf: true, xml: true, enviado_correo: true, asiento: 'ap-asi-2026-09-001' },
    { id: 'fe-pe-09', cliente: 'c-punto', periodo: '2026-09', numero: '', reference_code: 'cierre-2026-09-c-punto', cufe: '', estado: 'rechazada', fecha: '2026-09-26', validada_en: '', total: 0, notificaciones: ['422: customer.municipality_code es obligatorio (Albania, Caquetá no estaba en el catálogo del cliente)'], pdf: false, xml: false, enviado_correo: false, asiento: null },
  ];
  const notas_credito = [
    { id: 'nc-1', factura: 'fe-sv-09', numero: 'NC 1', fecha: '2026-10-02', concepto: '2', motivo: 'Visita del 24 de septiembre sincronizada el 28: se anula y se reemite con los kilos completos', total: 0, cufe: hashFake('nc-1') + hashFake('z'), estado: 'validada', aprobada_por: 'Diego A. Cartagena' },
  ];
  // JSON que el sistema arma para POST /v2/bills/validate
  function armarFacturaJSON(cierre) {
    const c = cierre.cliente, f = cierre.factura, p = cierre.periodo; const tar = cierre.tarifa || {};
    const credito = /30/.test(tar.plazo || '');
    return {
      reference_code: `cierre-${p.id}-${c.id}`, document: '01', numbering_range_id: proveedor_fe.rango.id, operation_type: '10',
      observation: `Servicio especial de aseo prestado mes de ${fmtMes(p.id)}. RH ${cierre.rh_numero || ''}.`,
      payment_details: [{ payment_form: credito ? '2' : '1', payment_method_code: credito ? '42' : '10', due_date: credito ? sumarDias(p.fin, 30) : undefined, amount: String(f.total) }],
      billing_period: { start_date: p.inicio, end_date: p.fin },
      customer: { identification_document_code: c.nit.length > 9 ? '13' : '31', identification: c.nit, dv: c.dv || undefined, company: c.razon_social, trade_name: c.nombre_comercial, address: c.direccion, email: c.email || undefined, phone: c.telefono, legal_organization_code: c.nit.length > 9 ? '2' : '1', tribute_code: 'ZZ', country_code: 'CO', responsibilities: ['R-99-PN'], municipality_code: c.ciudad === 'Florencia' ? '18001' : (c.ciudad === 'Morelia' ? '18479' : (c.ciudad === 'Albania' ? '18029' : '')) },
      items: [
        { code_reference: SERVICIOS_HELISA.basico.codigo, name: 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS', quantity: '1.00', discount_rate: '0.00', price: f.basico.toFixed(2), unit_measure_code: '94', standard_code: '999', taxes: [{ code: '01', rate: f.iva_pct.toFixed(2) }] },
        ...(f.adicionales > 0 ? [{ code_reference: SERVICIOS_HELISA.kg.codigo, name: 'KILOGRAMOS ADICIONALES', quantity: f.adicionales.toFixed(2), discount_rate: '0.00', price: f.precio_kg.toFixed(2), unit_measure_code: '94', standard_code: '999', taxes: [{ code: '01', rate: f.iva_pct.toFixed(2) }] }] : []),
      ],
    };
  }
  const facturaFeDe = (clienteId, periodoId) => facturas_fe.find((x) => x.cliente === clienteId && x.periodo === periodoId) || null;

  // Archivos planos generados
  const archivos_plano = [
    { id: 'ap-ped-2026-09-001', tipo: 'PED', periodo: '2026-09', plantilla: 'pl-ped-1', consecutivo: 1, nombre: 'COMSERVA_PED_2026-09_001.txt', estado: 'rechazado', generado_por: 'Lucrecia Quintero', generado_en: '2026-09-26 17:50', descargado_en: '2026-09-26 17:51', rechazado_en: '2026-09-27 08:20', errores: 'Fila 5: el código de cliente 1117490216 no existe.\nFila 29: el código de servicio SRV-KG no existe en la cartilla de servicios.', documentos: 12, filas: 34, debitos: 0, creditos: 0, sha256: '' },
    { id: 'ap-ped-2026-09-002', tipo: 'PED', periodo: '2026-09', plantilla: 'pl-ped-1', consecutivo: 2, nombre: 'COMSERVA_PED_2026-09_002.txt', estado: 'importado', generado_por: 'Lucrecia Quintero', generado_en: '2026-09-27 09:05', descargado_en: '2026-09-27 09:06', importado_en: '2026-09-27 09:40', importado_por: 'Lucrecia Quintero', documentos: 12, filas: 34, debitos: 0, creditos: 0, sha256: '', nota: '12 pedidos importados; Lucrecia hizo las 12 facturas llamando cada pedido con F5 (FVE 25756 a 25767).' },
    { id: 'ap-asi-2026-09-001', tipo: 'ASI', periodo: '2026-09', plantilla: 'pl-asi-1', consecutivo: 1, nombre: 'COMSERVA_ASI_2026-09_001.xls', estado: 'importado', generado_por: 'Lucrecia Quintero', generado_en: '2026-09-28 10:05', descargado_en: '2026-09-28 10:06', importado_en: '2026-09-28 10:30', importado_por: 'Lucrecia Quintero', documentos: 12, filas: 46, debitos: 1180452, creditos: 1180452, sha256: '', nota: 'Propuesta B (simulación): asientos de las 12 facturas emitidas por el sistema; Helisa quedó con la misma contabilidad.' },
    { id: 'ap-rc-2026-09-001', tipo: 'RC', periodo: '2026-09', plantilla: 'pl-rc-1', consecutivo: 1, nombre: 'COMSERVA_RC_2026-09_001.xls', estado: 'importado', generado_por: 'Lucrecia Quintero', generado_en: '2026-09-29 09:50', descargado_en: '2026-09-29 09:51', importado_en: '2026-09-29 10:10', importado_por: 'Lucrecia Quintero', documentos: 3, filas: 6, debitos: 151130, creditos: 151130, sha256: '', nota: 'Recibos definitivos RC 8812 a 8814; cruce automático por DOC FUENTE.' },
  ];
  archivos_plano.forEach((a) => { a.sha256 = hashFake(a.nombre + a.generado_en); });

  // Estado del cierre de un cliente (v5): abierto → cerrado → exportado → facturado
  function estadoCierre(clienteId, periodoId) {
    const p = byId(periodos, periodoId); if (!p || p.estado === 'abierto') return 'abierto';
    if (facturaDe(clienteId, periodoId)) return 'facturado';
    if (archivos_plano.some((a) => a.tipo === 'PED' && a.periodo === periodoId && a.estado !== 'anulado' && a.estado !== 'rechazado')) return 'exportado';
    return 'cerrado';
  }

  // --- Motor de vista previa: genera las filas de un archivo plano con una plantilla ---------------
  const sinTildes = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ñ/g, 'n').replace(/Ñ/g, 'N');
  function fmtFechaPlano(iso, f) { const d = parseISO(iso); const dd = String(d.getDate()).padStart(2, '0'), mm = String(d.getMonth() + 1).padStart(2, '0'), yy = d.getFullYear(); return f === 'yyyy-MM-dd' ? `${yy}-${mm}-${dd}` : (f === 'ddMMyyyy' ? `${dd}${mm}${yy}` : `${dd}/${mm}/${yy}`); }
  function fmtValorPlano(n, pl) { const v = Number(n || 0); if (!pl.decimales) return String(Math.round(v)); return v.toFixed(pl.decimales).replace('.', pl.separador_decimal || ','); }
  function textoPlano(s, pl) { let t = String(s ?? ''); if (pl.quitar_tildes) t = sinTildes(t); if (pl.mayusculas) t = t.toUpperCase(); return t; }
  function contextoFV(pl, cierre) {
    const c = cierre.cliente, f = cierre.factura, p = cierre.periodo;
    const tar = cierre.tarifa || {};
    return {
      'plantilla.tipo_documento': pl.tipo_documento, 'plantilla.centro_costo': pl.centro_costo,
      'documento.fecha': fmtFechaPlano(cierre.fecha_sugerida || p.fin, pl.formato_fecha), 'documento.numero': '', 'documento.doc_fuente': `${pl.prefijo_doc_fuente}${cierre.rh_numero || ''}`.replace(/-/g, ''), 'documento.forma_pago': /30/.test(tar.plazo || '') ? '6' : '1',
      'cliente.nit': pl.nit_con_dv ? c.nit + c.dv : c.nit, 'cliente.dv': c.dv, 'cliente.razon_social_helisa': c.razon_social, 'cliente.direccion': c.direccion, 'cliente.telefono': c.telefono, 'cliente.ciudad': c.ciudad, 'cliente.email': c.email,
      'cliente.codigo_helisa': (cierre.sede_codigo || c.codigo_helisa || c.nit), 'pedido.numero': String(cierre.rh_numero || '').replace(/-/g, ''), 'pedido.tipo_linea': '2',
      'periodo.nombre': p.nombre, 'rh.numero': cierre.rh_numero || '', 'rh.kg_total': fmtKg(f.kg), 'rh.kg_adicionales': fmtKg(f.adicionales), 'rh.precio_kg': String(f.precio_kg), 'rh.basico': String(f.basico), 'rh.valor_adicionales': String(f.valorAdicionales), 'rh.subtotal': String(f.subtotal), 'rh.iva_pct': String(f.iva_pct), 'rh.iva': String(f.iva), 'rh.total': String(f.total),
    };
  }
  function contextoRC(pl, r, a) {
    const c = cliente(r.cliente); const fa = a ? factura(a.factura) : null;
    return {
      'plantilla.tipo_documento': pl.tipo_documento, 'plantilla.centro_costo': pl.centro_costo,
      'documento.fecha': fmtFechaPlano(r.fecha, pl.formato_fecha), 'documento.numero': String(r.consecutivo), 'documento.doc_fuente': fa ? fa.numero.replace(/\s/g, '') : '', 'documento.forma_pago': '1',
      'cliente.nit': pl.nit_con_dv ? c.nit + c.dv : c.nit, 'cliente.dv': c.dv, 'cliente.razon_social_helisa': c.razon_social, 'cliente.direccion': c.direccion, 'cliente.telefono': c.telefono, 'cliente.ciudad': c.ciudad, 'cliente.email': c.email,
      'recibo.numero': String(r.consecutivo), 'recibo.tipo': TIPO_RECIBO_LABEL[r.tipo] || r.tipo || '', 'recibo.valor': String(r.valor), 'recibo.medio': 'Efectivo',
      'aplicacion.factura_numero': fa ? fa.numero.replace(/\s/g, '') : '', 'aplicacion.valor': a ? String(a.valor) : '',
    };
  }
  const plantillaTexto = (t, ctx) => String(t || '').replace(/\{([a-z_.]+)\}/g, (m, k) => (ctx[k] ?? ''));
  // Valores de cada línea según su tipo
  function valorLinea(l, cierre, r, a) {
    if (cierre) { const f = cierre.factura; return { ingreso_basico: f.basico, ingreso_adicionales: f.valorAdicionales, ingreso_unico: f.subtotal, iva: f.iva, cartera: f.total }[l.tipo] ?? 0; }
    return { caja: r.valor, banco: r.valor, cartera: a ? a.valor : r.valor }[l.tipo] ?? 0;
  }
  function filasDocumento(pl, ctxBase, lineasValor) {
    const filas = []; let orden = 0, deb = 0, cre = 0;
    lineasValor.forEach(({ l, valor, ctx }) => {
      if (l.omitir_cero && !valor) return;
      orden++;
      const lc = { ...ctx, 'linea.cuenta': l.cuenta, 'linea.concepto': plantillaTexto(l.concepto, ctx), 'linea.valor': fmtValorPlano(valor, pl), 'linea.naturaleza': l.naturaleza, 'linea.base': l.base ? fmtValorPlano(ctx['rh.subtotal'] || 0, pl) : '', 'linea.clase': l.clase, 'linea.orden': String(orden) };
      const fila = {};
      pl.columnas.forEach((col) => { let v = ''; if (col.origen === 'campo') v = lc[col.campo] ?? ''; else if (col.origen === 'constante') v = col.constante; fila[col.titulo] = textoPlano(v, pl); });
      filas.push({ fila, linea: l, valor, naturaleza: l.naturaleza });
      if (l.clase === 'F') { if (l.naturaleza === 'D') deb += valor; else cre += valor; }
    });
    return { filas, deb, cre };
  }
  // generarPlano(plantilla, {cierres:[cierreCliente...]} | {recibos:[...]}) → {filas, documentos, debitos, creditos, errores}
  function generarPlano(pl, docs) {
    const out = { filas: [], documentos: 0, debitos: 0, creditos: 0, errores: [], avisos: [] };
    if (pl.tipo === 'PED') (docs.cierres || []).forEach((cz) => {
      if (!cz.factura) { out.errores.push(`${cz.cliente.nombre_comercial}: sin tarifa vigente, no se puede liquidar.`); return; }
      if (pl.valida_tercero && cz.cliente.existe_en_helisa === false) out.errores.push(`${cz.cliente.nombre_comercial}: no tiene código de cliente en Helisa; importe primero la cartilla de terceros.`);
      const ctx = contextoFV(pl, cz); const f = cz.factura; let orden = 0;
      const lineasPed = [
        { l: pl.lineas[0], cantidad: 1, vu: f.basico, srv: SERVICIOS_HELISA.basico, tipoLinea: '2' },
        { l: pl.lineas[1], cantidad: f.adicionales, vu: f.precio_kg, srv: SERVICIOS_HELISA.kg, tipoLinea: '2' },
        { l: pl.lineas[2], cantidad: 0, vu: 0, srv: null, tipoLinea: '3' },
      ].filter((x) => x.l);
      lineasPed.forEach((x) => {
        if (x.l.omitir_cero && !x.cantidad) return;
        orden++;
        const lc = { ...ctx, 'pedido.tipo_linea': x.tipoLinea, 'servicio.codigo': x.srv ? x.srv.codigo : '', 'servicio.lista_precios': x.srv ? x.srv.lista : '', 'linea.concepto': plantillaTexto(x.l.concepto, ctx), 'linea.cantidad': x.srv ? fmtValorPlano(x.cantidad, pl) : '', 'linea.valor_unitario': x.srv ? fmtValorPlano(x.vu, { decimales: 0 }) : '', 'linea.total': x.srv ? fmtValorPlano(Math.round(x.cantidad * x.vu), { decimales: 0 }) : '', 'linea.orden': String(orden) };
        const fila = {}; pl.columnas.forEach((col) => { let v = ''; if (col.origen === 'campo') v = lc[col.campo] ?? ''; else if (col.origen === 'constante') v = col.constante; fila[col.titulo] = textoPlano(v, pl); });
        out.filas.push({ fila, doc: cz.cliente.nombre_comercial, valor: x.srv ? Math.round(x.cantidad * x.vu) : 0 });
      });
      out.documentos++; out.debitos += f.total; out.creditos += f.total;
    });
    if (pl.tipo === 'ASI') (docs.cierres || []).forEach((cz) => {
      if (!cz.factura) { out.errores.push(`${cz.cliente.nombre_comercial}: sin tarifa vigente, no se puede liquidar.`); return; }
      if (pl.valida_tercero && !cz.cliente.dv) out.errores.push(`${cz.cliente.nombre_comercial}: NIT sin dígito de verificación.`);
      if (pl.valida_tercero && cz.cliente.existe_en_helisa === false) out.errores.push(`${cz.cliente.nombre_comercial}: no está marcado «existe en Helisa»; importe primero la cartilla de terceros.`);
      const ctx = contextoFV(pl, cz);
      const r = filasDocumento(pl, ctx, pl.lineas.map((l) => ({ l, valor: valorLinea(l, cz), ctx })));
      r.filas.forEach((f) => { f.doc = cz.cliente.nombre_comercial; out.filas.push(f); });
      out.documentos++; out.debitos += r.deb; out.creditos += r.cre;
      if (pl.valida_cuadre && Math.round(r.deb) !== Math.round(r.cre)) out.errores.push(`${cz.cliente.nombre_comercial}: débitos ${fmtCOP(r.deb)} ≠ créditos ${fmtCOP(r.cre)}.`);
    });
    if (pl.tipo === 'RC') (docs.recibos || []).forEach((rc) => {
      const c = cliente(rc.cliente);
      const aps = rc.aplicaciones || [];
      if (pl.valida_fve && (!aps.length || aps.some((a) => !factura(a.factura)))) { out.errores.push(`Recibo ${rc.consecutivo} (${c.nombre_comercial}): sin factura registrada a la que aplicar.`); return; }
      const lineas = [];
      pl.lineas.forEach((l) => {
        if (l.tipo === 'cartera') aps.forEach((a) => lineas.push({ l, valor: valorLinea(l, null, rc, a), ctx: contextoRC(pl, rc, a) }));
        else lineas.push({ l, valor: valorLinea(l, null, rc, aps[0]), ctx: contextoRC(pl, rc, aps[0]) });
      });
      const r = filasDocumento(pl, null, lineas);
      r.filas.forEach((f) => { f.doc = `Recibo ${rc.consecutivo} · ${c.nombre_comercial}`; out.filas.push(f); });
      out.documentos++; out.debitos += r.deb; out.creditos += r.cre;
      if (pl.valida_cuadre && Math.round(r.deb) !== Math.round(r.cre)) out.errores.push(`Recibo ${rc.consecutivo}: débitos ${fmtCOP(r.deb)} ≠ créditos ${fmtCOP(r.cre)}.`);
    });
    if (pl.tipo === 'TER') (docs.clientes || []).forEach((c) => {
      const ctx = contextoFV(pl, { cliente: c, factura: { kg: 0, adicionales: 0, precio_kg: 0, basico: 0, valorAdicionales: 0, subtotal: 0, iva_pct: 0, iva: 0, total: 0 }, periodo: periodos[0], tarifa: {} });
      const fila = {}; pl.columnas.forEach((col) => { let v = ''; if (col.origen === 'campo') v = ctx[col.campo] ?? ''; else if (col.origen === 'constante') v = col.constante; fila[col.titulo] = textoPlano(v, pl); });
      out.filas.push({ fila, doc: c.nombre_comercial, valor: 0 }); out.documentos++;
    });
    return out;
  }
  // Texto del archivo (csv/txt) para la descarga de prueba
  function textoArchivo(pl, gen) {
    const sep = pl.formato === 'txt' ? '\t' : (pl.separador || ';');
    const cab = pl.con_titulos ? [pl.columnas.map((c) => c.titulo).join(sep)] : [];
    return cab.concat(gen.filas.map((f) => pl.columnas.map((c) => f.fila[c.titulo] ?? '').join(sep))).join('\r\n');
  }

  // Barra superior común de los mockups
  function mockBar(active) {
    const links = [
      ['../index.html', 'Inicio'],
      ['../app/index.html', 'App móvil'],
      ['../panel/index.html', 'Panel web'],
      ['../documentos/index.html', 'Documentos PDF'],
      ['../portal/index.html', 'Portal (fase 2)'],
    ];
    return `<div class="mock-bar no-print"><span class="tag">MOCKUP · FASE 1 · V6</span><span>RH digital Comserva · datos de prueba · hoy: ${fmtFecha(HOY, { dia: true })}</span><span class="spacer"></span><nav>${links.map(([h, t]) => `<a href="${h}"${t === active ? ' style="color:#fff;font-weight:700;text-decoration:underline"' : ''}>${t}</a>`).join('')}</nav></div>`;
  }

  return {
    HOY, empresa, parametros, dispositores, categorias, operarios, vehiculos, usuarios, clientes, periodos, visitas, ruta_hoy, recibos, actas, auditoria,
    facturas, plantillas_plano, archivos_plano, CAMPOS_PLANO, COLUMNAS_HELISA, colsHelisa, SERVICIOS_HELISA, proveedor_fe, facturas_fe, notas_credito, armarFacturaJSON, facturaFeDe,
    ROL_LABEL, FRECUENCIA_LABEL, CARTERA_LABEL, ESTADO_VISITA_LABEL, TIPO_RECIBO_LABEL, ESTADO_RECIBO_LABEL, ESTADO_PLANO_LABEL, ESTADO_CIERRE_LABEL, MESES, DIAS,
    factura, facturaDe, saldoReferencia, facturasConSaldo, clienteTieneFactura, plantillaVigente, estadoCierre, generarPlano, textoArchivo, sumarDias,
    fmtCOP, fmtKg, fmtNum, fmtFecha, fmtFechaCorta, fmtMes, cap, parseISO, byId, cliente, operario, categoria, dispositor, nitCompleto, iniciales,
    tarifaVigente, totalKg, visitasDe, totalizar, calcularFactura, cierreCliente, cierrePeriodo, numeroALetras, firmaSVG, qrSVG, hashFake, consecutivoPlanilla, pad, mockBar,
  };
})();
