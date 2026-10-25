/* =====================================================================
   RH digital Comserva · datos de prueba compartidos por todos los mockups
   -------------------------------------------------------------------
   v6 · PROPUESTA 1 · RH digital hasta Helisa (pedidos y recibos).
   Parte de la base común de las dos propuestas y agrega, al final, la capa
   «PROPUESTA 1» (plantillas de pedido y de recibo, archivos OP y RC, registro
   de la FVE, cola simulada de Helisa Conekta y trazabilidad P1).
   Los datos de Cofema (septiembre de 2026) son los reales de la planilla
   en papel, el acta y la factura FVE 25756 (en el sistema, su planilla RH
   es la 22690-26, número del mockup). Las cifras del esquema
   «solo por kilo» (108,50 kg × $3.991,60 + IVA = $515.375,43) son las de la
   FVE 25997 vista el 21 de octubre, aplicadas a un cliente FICTICIO marcado
   como dato de prueba. Todo lo demás es ficticio pero verosímil para
   Florencia (Caquetá). "Hoy" en los mockups es el jueves 22 de octubre de
   2026, dentro del periodo octubre (27 sep – 26 oct); desde el día 20 se
   puede cerrar cliente por cliente (cierre anticipado).
   ===================================================================== */
window.DATA = (function () {
  const HOY = '2026-10-22';

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
    gerente: 'Diego',
    bancos: 'Davivienda cta. corriente ••••9147 · Bancolombia ahorros ••••0391 (números completos ocultos en el mockup)',
  };

  const parametros = {
    dia_corte: 26,
    iva_pct: 19,
    formato_planilla: '{n}-{yy}',
    siguiente_planilla: 22706, // v6: 22702-26 a 22705-26 se asignaron en los cierres anticipados del 20, 21 y 22 de octubre
    siguiente_recibo: 35688,
    siguiente_acta: 25731,
    siguiente_constancia: 1189,
    dia_inicio_cierre: 20, // v6: desde este día del mes se puede cerrar cliente por cliente (cierre anticipado)
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
    { id: 'op-dubeny', nombre: 'Dubeny', documento: '(dato de prueba)', cargo: 'Conductor', telefono: '300 000 0101', usuario: 'dubeny', activo: true, dispositivo: 'Samsung Galaxy A35 · Android 15', rango_constancias: { desde: 1151, hasta: 1200, siguiente: 1189 }, rango_recibos: { desde: 35671, hasta: 35700, siguiente: 35688 } },
    { id: 'op-jesus', nombre: 'Jesús', documento: '(dato de prueba)', cargo: 'Auxiliar', telefono: '300 000 0102', usuario: 'jesus', activo: true, dispositivo: 'Xiaomi Redmi Note 13 · Android 14', rango_constancias: { desde: 1201, hasta: 1250, siguiente: 1210 }, rango_recibos: { desde: 35701, hasta: 35730, siguiente: 35703 } },
  ];

  const vehiculos = [
    { placa: 'SNV 429', descripcion: 'Furgón Chevrolet NHR · residuos peligrosos', activo: true },
    { placa: 'UQX 904', descripcion: 'Furgón JAC 1035 · respaldo', activo: true },
  ];

  const usuarios = [
    { id: 'u-lucrecia', nombre: 'Lucrecia', rol: 'facturacion', email: 'facturacion@comserva.com.co', activo: true, ultimo_acceso: '2026-10-22 07:48' },
    { id: 'u-diego', nombre: 'Diego', rol: 'gerencia', email: 'gerencia@comserva.com.co', activo: true, ultimo_acceso: '2026-10-21 16:10' },
    { id: 'u-dubeny', nombre: 'Dubeny', rol: 'operario', email: 'dubeny@comserva.com.co', activo: true, ultimo_acceso: '2026-10-22 06:52' },
    { id: 'u-jesus', nombre: 'Jesús', rol: 'operario', email: 'jesus@comserva.com.co', activo: true, ultimo_acceso: '2026-10-21 17:20' },
  ];

  const ROL_LABEL = { operario: 'Operario', facturacion: 'Facturación y cartera', gerencia: 'Gerencia', admin: 'Administrador', cliente: 'Cliente' };

  // Clientes. Tarifa = valor básico mensual + kilos incluidos + precio del kilo adicional (+ IVA)
  const clientes = [
    { id: 'c-cofema', nit: '891190218', dv: '5', razon_social: 'Compañía de Fomento Empresarial y Mercados Agroindustriales S.A.', nombre_comercial: 'Cofema S.A.', sede: 'Campo / Base Florencia', direccion: 'Km 5 vía Morelia, Barrio Cofema', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Área de liquidación', telefono: '318 372 4275', whatsapp: '318 372 4275', email: 'liquidacion@cofemacaqueta.com.co', frecuencia: 'semanal', dia_visita: 'Sábado', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2024-02-01',
      tarifas: [
        { desde: '2026-01-01', hasta: null, basico: 74790, kg_incluidos: 20, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: 'Confirmar kilos incluidos (deducidos de la FVE 25756)' },
        { desde: '2025-01-01', hasta: '2025-12-31', basico: 71200, kg_incluidos: 20, precio_kg: 4380, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' },
      ] },
    { id: 'c-trebol', nit: '900555017', dv: '1', razon_social: 'Droguería y Papelería El Trébol', nombre_comercial: 'Droguería El Trébol', sede: 'Local principal', direccion: 'Carrera 3 N.º 8-15', ciudad: 'Morelia', departamento: 'Caquetá', contacto: 'Administración', telefono: '300 000 0017', whatsapp: '300 000 0017', email: 'eltrebol@example.com', frecuencia: 'quincenal', dia_visita: 'Miércoles', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2026-08-14',
      tarifas: [{ desde: '2026-08-14', hasta: null, basico: 55000, kg_incluidos: 8, precio_kg: 4200, iva_pct: 19, plazo: '10 primeros días del mes siguiente', nota: 'Contrato quincenal del 14-08-2026 (cliente ficticio)' }] },
    { id: 'c-saludvital', nit: '901233845', dv: '7', razon_social: 'IPS Salud Vital Florencia S.A.S.', nombre_comercial: 'IPS Salud Vital', sede: 'Sede Centro', direccion: 'Carrera 11 N.º 14-30', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Jefe de enfermería', telefono: '300 000 0002', whatsapp: '300 000 0002', email: 'calidad.saludvital@example.com', frecuencia: 'semanal', dia_visita: 'Lunes', estado: 'activo', cartera: 'en_mora', cartera_fuente: 'Excel Helisa 17 oct', creado: '2023-05-10',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 120000, kg_incluidos: 30, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-labamazonia', nit: '900876120', dv: '3', razon_social: 'Laboratorio Clínico Amazonía Ltda.', nombre_comercial: 'Laboratorio Amazonía', sede: 'Sede única', direccion: 'Calle 16 N.º 8-45, Barrio Juan XXIII', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Bacterióloga coordinadora', telefono: '300 000 0003', whatsapp: '300 000 0003', email: 'laboratorio.amazonia@example.com', frecuencia: 'quincenal', dia_visita: 'Martes', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2024-09-15',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 65000, kg_incluidos: 10, precio_kg: 4800, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-sonrisas', nit: '1000000029', dv: '4', razon_social: 'Odontología Sonrisas del Caquetá', nombre_comercial: 'Sonrisas del Caquetá', sede: 'Consultorio', direccion: 'Carrera 9 N.º 12-18, oficina 201', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Dra. Patricia', telefono: '300 000 0004', whatsapp: '300 000 0004', email: 'sonrisascaqueta@example.com', frecuencia: 'mensual', dia_visita: 'Primer jueves', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Manual', creado: '2025-03-02',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 48000, kg_incluidos: 6, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-economia', nit: '1000000452', dv: '7', razon_social: 'Droguería La Economía de Morelia', nombre_comercial: 'Droguería La Economía', sede: 'Local', direccion: 'Calle 5 N.º 3-10, parque principal', ciudad: 'Morelia', departamento: 'Caquetá', contacto: 'Don Arnulfo', telefono: '300 000 0005', whatsapp: '300 000 0005', email: '', frecuencia: 'mensual', dia_visita: 'Tercer viernes', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Recibo de caja', creado: '2025-11-20',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 45000, kg_incluidos: 6, precio_kg: 4000, iva_pct: 19, plazo: 'Paga en efectivo en la visita', nota: 'Paga en efectivo' }] },
    { id: 'c-huellas', nit: '900654321', dv: '0', razon_social: 'Veterinaria Huellas Felices S.A.S.', nombre_comercial: 'Veterinaria Huellas', sede: 'Clínica veterinaria', direccion: 'Avenida Circunvalar N.º 20-55', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Dr. Mauricio', telefono: '300 000 0006', whatsapp: '300 000 0006', email: 'huellasfelicesvet@example.com', frecuencia: 'quincenal', dia_visita: 'Jueves', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2024-06-11',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 52000, kg_incluidos: 8, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: 'Genera residuos de animales (categoría sin tratamiento definido)' }] },
    { id: 'c-pielviva', nit: '1000000098', dv: '2', razon_social: 'Centro de Estética Piel Viva', nombre_comercial: 'Piel Viva', sede: 'Local', direccion: 'Calle 19 N.º 10-77', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Yurany', telefono: '300 000 0007', whatsapp: '300 000 0007', email: 'pielvivaestetica@example.com', frecuencia: 'mensual', dia_visita: 'Segundo lunes', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Recibo de caja', creado: '2026-02-09',
      tarifas: [{ desde: '2026-02-09', hasta: null, basico: 42000, kg_incluidos: 5, precio_kg: 4600, iva_pct: 19, plazo: 'Paga en efectivo en la visita', nota: 'Paga en efectivo' }] },
    { id: 'c-visionsur', nit: '900334876', dv: '4', razon_social: 'Clínica Oftalmológica Visión Sur S.A.S.', nombre_comercial: 'Visión Sur', sede: 'Sede principal', direccion: 'Carrera 14 N.º 7-90', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Coordinación de calidad', telefono: '300 000 0008', whatsapp: '300 000 0008', email: 'calidad.visionsur@example.com', frecuencia: 'semanal', dia_visita: 'Viernes', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2023-01-18',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 95000, kg_incluidos: 20, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-tinta', nit: '1000000120', dv: '7', razon_social: 'Estudio de Tatuajes Tinta Negra', nombre_comercial: 'Tinta Negra', sede: 'Estudio', direccion: 'Calle 13 N.º 11-04', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Kevin', telefono: '300 000 0009', whatsapp: '300 000 0009', email: '', frecuencia: 'mensual', dia_visita: 'Último martes', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Recibo de caja', creado: '2026-05-05',
      tarifas: [{ desde: '2026-05-05', hasta: null, basico: 40000, kg_incluidos: 4, precio_kg: 4600, iva_pct: 19, plazo: 'Paga en efectivo en la visita', nota: 'Paga en efectivo' }] },
    { id: 'c-ramirez', nit: '1000000330', dv: '7', razon_social: 'Consultorio Médico Dr. Ramírez', nombre_comercial: 'Consultorio Dr. Ramírez', sede: 'Consultorio', direccion: 'Carrera 8 N.º 15-61', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Secretaria', telefono: '300 000 0010', whatsapp: '300 000 0010', email: 'consultorioramirez@example.com', frecuencia: 'mensual', dia_visita: 'Primer miércoles', estado: 'activo', cartera: 'en_mora', cartera_fuente: 'Excel Helisa 17 oct', creado: '2022-08-30',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 46000, kg_incluidos: 6, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-olivos', nit: '900128790', dv: '1', razon_social: 'Funeraria Los Olivos del Caquetá S.A.S.', nombre_comercial: 'Funeraria Los Olivos', sede: 'Sala de tanatopraxia', direccion: 'Calle 21 N.º 6-14', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Administrador', telefono: '300 000 0011', whatsapp: '300 000 0011', email: 'losolivoscaqueta@example.com', frecuencia: 'quincenal', dia_visita: 'Sábado', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2024-11-03',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 60000, kg_incluidos: 10, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-nueva', nit: '1000000340', dv: '', razon_social: 'Droguería Nueva Esperanza', nombre_comercial: 'Droguería Nueva Esperanza', sede: 'Local', direccion: 'Barrio Las Malvinas, manzana C casa 12', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Doña Rosalba', telefono: '300 000 0012', whatsapp: '300 000 0012', email: '', frecuencia: 'mensual', dia_visita: '', estado: 'pendiente_validar', existe_en_helisa: false, cartera: 'sin_info', cartera_fuente: '', creado: '2026-10-16', creado_por: 'Dubeny (en campo)',
      tarifas: [] },
    // v6 · clientes FICTICIOS para probar los otros dos esquemas de tarifa (marcados dato_prueba; van al final para no mover la numeración de planillas de la v5)
    { id: 'c-prueba-kg', dato_prueba: true, nit: '900999001', dv: '1', razon_social: 'Centro Clínico de Prueba S.A.S.', nombre_comercial: 'Centro Clínico de Prueba', sede: 'Sede principal', direccion: 'Dirección de prueba', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Coordinación administrativa (dato de prueba)', telefono: '', whatsapp: '', email: '', frecuencia: 'semanal', dia_visita: 'Miércoles', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Dato de prueba', creado: '2026-09-28',
      nota_prueba: 'Cliente ficticio. Usa las cifras de la FVE 25997 vista el 21 de octubre (108,50 kg × $3.991,60 + IVA 19 % = $515.375,43) para probar el esquema «solo por kilo» y el redondeo de Helisa.',
      tarifas: [{ desde: '2026-09-28', hasta: null, esquema: 'solo_kg', basico: 0, kg_incluidos: 0, precio_kg: 3991.6, iva_pct: 19, plazo: 'Crédito 30 días', nota: 'Solo por kilo, como la FVE 25997 (dato de prueba)' }] },
    { id: 'c-prueba-fijo', dato_prueba: true, nit: '900999002', dv: '7', razon_social: 'Consultorio de Prueba S.A.S.', nombre_comercial: 'Consultorio de Prueba', sede: 'Consultorio', direccion: 'Dirección de prueba', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Recepción (dato de prueba)', telefono: '', whatsapp: '', email: '', frecuencia: 'mensual', dia_visita: 'Primer martes', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Dato de prueba', creado: '2026-10-01',
      nota_prueba: 'Cliente ficticio para el esquema de cobro fijo mensual. En Helisa se vieron muchas FVE de $29.750 y $35.700 (≈ $25.000 o $30.000 + IVA): esquema inferido, por confirmar.',
      tarifas: [{ desde: '2026-10-01', hasta: null, esquema: 'fijo', valor_fijo: 25000, basico: 25000, kg_incluidos: 0, precio_kg: 0, iva_pct: 19, plazo: 'Crédito 30 días', nota: 'Cobro fijo mensual de $25.000 + IVA (dato de prueba; también se vieron $30.000)' }] },
  ];

  // ---------------------------------------------------------------------
  // v6 · Esquemas de tarifa (los tres de la fase 1)
  //   basico_kg : básico mensual + kilos incluidos + kilo adicional (Cofema, FVE 25756)
  //   solo_kg   : todos los kilos del periodo × precio del kilo (FVE 25997)
  //   fijo      : valor fijo mensual, sin importar los kilos (FVE de $29.750 / $35.700)
  // Una tarifa sin «esquema» se trata como basico_kg (compatibilidad con la v5).
  // ---------------------------------------------------------------------
  const ESQUEMA_TARIFA_LABEL = { basico_kg: 'Básico + kilos incluidos + kilo adicional', solo_kg: 'Solo por kilo', fijo: 'Cobro fijo mensual' };
  const ESQUEMA_TARIFA_CORTO = { basico_kg: 'Básico + kg', solo_kg: 'Por kilo', fijo: 'Fijo' };
  clientes.forEach((c) => (c.tarifas || []).forEach((t) => { if (!t.esquema) t.esquema = 'basico_kg'; }));

  // ---------------------------------------------------------------------
  // v6 · Equivalencias con Helisa (tabla nueva común a las dos propuestas)
  // Valores vistos en la Helisa de Comserva el 21 de octubre y CONFIRMADOS con el Excel que envió Julio el 23 de octubre
  // («Plano pedido.xlsx», hojas «Plano Pedidos», «Servicios» y «Plano Recibos»): vendedor 828002730, centro de costo
  // 0101 (texto), negocio VACÍO, siete listas de precio y la cartilla de servicios (códigos 2, 3, 4 a 21 y 54).
  // Siguen por confirmar: la lista de cada cliente, el código del cliente (vacío si es el mismo NIT) y el uso de los códigos por categoría.
  // ---------------------------------------------------------------------
  // Listas de precio de Helisa (hoja «Servicios», Excel de Julio 23 oct). Mismos códigos de servicio en las 7 listas.
  // En las listas especiales (3 a 7) el precio de la cartilla es 0: el valor unitario va en el pedido.
  const LISTAS_PRECIO_HELISA = [
    { id: '1', nombre: 'BASICA 25000', basico: 25000, kg: 3850, especial: false }, { id: '2', nombre: 'BASICA 30000', basico: 30000, kg: 4000, especial: false },
    { id: '3', nombre: 'ESPECIAL 80000', basico: 0, kg: 0, especial: true }, { id: '4', nombre: 'ESPECIAL 42000', basico: 0, kg: 0, especial: true }, { id: '5', nombre: 'ESPECIAL 110000', basico: 0, kg: 0, especial: true },
    { id: '6', nombre: 'TARIFA ESPECIAL 2', basico: 0, kg: 0, especial: true }, { id: '7', nombre: 'TARIFA ESPECIAL 3', basico: 0, kg: 0, especial: true },
  ];
  const listaPrecio = (id) => LISTAS_PRECIO_HELISA.find((l) => l.id === String(id)) || null;
  // Cartilla de servicios de Helisa que usa el servicio de residuos (de 57 códigos). iva: 19 o null (sin IVA en la cartilla).
  const CARTILLA_HELISA = [
    [2, 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS', 19, 'basico'], [3, 'KILOGRAMOS ADICIONALES', 19, 'kg_adicionales'],
    [4, 'ANATOMOPATOLÓGICOS (KILOGRAMOS)', 19, 'categoria'], [5, 'BIOSANITARIOS (KILOGRAMOS)', 19, 'categoria'], [6, 'CORTOPUNZANTES (KILOGRAMOS)', 19, 'categoria'],
    [7, 'QUIMICOS (GALON)', null, 'categoria'], [8, 'TÓXICOS (KILOGRAMOS)', 19, 'categoria'], [9, 'MEDICAMENTOS VENCIDOS (KILOGRAMOS)', 19, 'categoria'], [10, 'INDUSTRIALES (KILOGRAMOS)', null, 'categoria'],
    [11, 'ANIMALES (KILOGRAMOS)', 19, 'categoria'], [12, 'BIOLÓGICOS (KILOGRAMOS)', 19, 'categoria'], [13, 'VIDRIO RESULTANTE DE LABORATORIO (KILOGRAMOS)', 19, 'categoria'],
    [16, 'RESIDUOS APARATOS ELCTRÓNICOS Y ELECTRÓNICOS RAEES (KILOS)', 19, 'categoria'], [17, 'RESIDUOS DE PILAS Y BATERIAS (KILOGRAMOS)', 19, 'categoria'], [20, 'LLANTAS (KILOGRAMOS)', 19, 'categoria'],
    [54, 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS EXENTO', null, 'exento'],
  ].map(([codigo, nombre, iva, uso]) => ({ codigo: String(codigo), nombre, iva, uso }));
  const FUENTE_HELISA = 'Excel de Julio, 23 oct';
  const helisa = {
    version: '4.12.2.0 (TSplus, helisacloud.com)',
    fuente: FUENTE_HELISA,
    lista_precio: { codigo: '', nombre: 'Por cliente (listas 1 a 7)', estado: 'por confirmar' },
    listas: LISTAS_PRECIO_HELISA,
    centro_costo: { codigo: '0101', nombre: 'FLORENCIA (texto, también en la línea de comentario)', estado: 'oficial' },
    negocio: { codigo: '', nombre: 'Vacío en el Excel de Julio', estado: 'oficial' },
    vendedor: { identidad: '828002730', nombre: 'COMSERVA (NIT sin DV)', estado: 'oficial' },
    bodega: { codigo: '', nombre: 'Vacío en el Excel de Julio', estado: 'oficial' },
    tipo_pedido: { codigo: 'OP', nombre: 'Pedido (habilitarlo en la Helisa de Comserva: Fase 0)', estado: 'oficial' },
    tipo_recibo: { codigo: 'RC', nombre: 'Recibo de caja (el archivo de Julio dice RC; confirmar si equivale a RC1 o RC2)', estado: 'oficial' },
    tipo_factura: { codigo: 'FVE', nombre: 'Factura de venta electrónica (en el cruce, el ejemplo de Julio dice FEV: por confirmar)', estado: 'visto' },
  };
  // Componente de la tarifa → concepto de Helisa. tipo_concepto: 2 = servicio, 3 = comentario (Excel de Julio, 23 oct).
  // La lista de precio de la línea es la del CLIENTE (c.helisa.lista_precio).
  const equivalencias_helisa = [
    { componente: 'basico', etiqueta: 'Servicio básico mensual', tipo_concepto: 2, codigo_concepto: '2', nombre_concepto: 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS', lista_precio: 'del cliente', estado: 'oficial', cantidad: '1', unitario: 'Básico de la tarifa' },
    { componente: 'kg_adicionales', etiqueta: 'Kilos adicionales', tipo_concepto: 2, codigo_concepto: '3', nombre_concepto: 'KILOGRAMOS ADICIONALES', lista_precio: 'del cliente', estado: 'oficial', cantidad: 'Kilos adicionales', unitario: 'Precio del kilo adicional' },
    { componente: 'kg_todos', etiqueta: 'Solo por kilo', tipo_concepto: 2, codigo_concepto: '', nombre_concepto: 'KILOGRAMOS ADICIONALES o el concepto de la categoría', lista_precio: 'del cliente', estado: 'por confirmar', nota: '¿Código 3 o el de la categoría (4 a 21)? Se confirma con Julio.', cantidad: 'Kilos del periodo', unitario: 'Precio del kilo' },
    { componente: 'fijo', etiqueta: 'Cobro fijo mensual', tipo_concepto: 2, codigo_concepto: '', nombre_concepto: 'Concepto del cobro fijo (¿código 2?)', lista_precio: 'del cliente', estado: 'por confirmar', cantidad: '1', unitario: 'Valor fijo' },
    { componente: 'exento', etiqueta: 'Servicio básico exento de IVA', tipo_concepto: 2, codigo_concepto: '54', nombre_concepto: 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS EXENTO', lista_precio: 'del cliente', estado: 'oficial', nota: 'Para los clientes exentos; ningún cliente del mockup lo usa.', cantidad: '1', unitario: 'Básico de la tarifa (sin IVA)' },
    { componente: 'comentario', etiqueta: 'Línea de comentario', tipo_concepto: 3, codigo_concepto: '', nombre_concepto: 'SERVICIO ESPECIAL DE ASEO PRESTADO MES DE {MES} {AÑO}', lista_precio: '', estado: 'oficial', cantidad: '', unitario: '' },
    // Alternativa por confirmar con Julio: un concepto por categoría en kilos (códigos 4 a 21 de la cartilla)
    { categoria: 'ANATO', etiqueta: 'Anatomopatológicos', tipo_concepto: 2, codigo_concepto: '4', nombre_concepto: 'ANATOMOPATOLÓGICOS (KILOGRAMOS)', lista_precio: 'del cliente', estado: 'por confirmar (alternativa)' },
    { categoria: 'BIOSAN', etiqueta: 'Biosanitarios', tipo_concepto: 2, codigo_concepto: '5', nombre_concepto: 'BIOSANITARIOS (KILOGRAMOS)', lista_precio: 'del cliente', estado: 'por confirmar (alternativa)' },
    { categoria: 'CORTO', etiqueta: 'Cortopunzantes', tipo_concepto: 2, codigo_concepto: '6', nombre_concepto: 'CORTOPUNZANTES (KILOGRAMOS)', lista_precio: 'del cliente', estado: 'por confirmar (alternativa)' },
    { categoria: 'ANIMAL', etiqueta: 'Animales', tipo_concepto: 2, codigo_concepto: '11', nombre_concepto: 'ANIMALES (KILOGRAMOS)', lista_precio: 'del cliente', estado: 'por confirmar (alternativa)' },
    { categoria: 'BIO', etiqueta: 'Biológicos', tipo_concepto: 2, codigo_concepto: '12', nombre_concepto: 'BIOLÓGICOS (KILOGRAMOS)', lista_precio: 'del cliente', estado: 'por confirmar (alternativa)' },
  ];
  const equivalencia = (componente) => equivalencias_helisa.find((e) => e.componente === componente) || null;

  // Código del cliente en Helisa (el «código adicional» cuando el mismo NIT se crea varias veces, p. ej. por sede)
  // y campos fiscales OPCIONALES (obligatorios solo si se factura electrónicamente desde el sistema, propuesta 2).
  // Los códigos son DE PRUEBA: los reales salen de la cartilla de clientes que exporta Helisa (por confirmar).
  const DANE = { Florencia: '18001', Morelia: '18479' };
  // Lista de precio del cliente: 1 o 2 si su tarifa coincide con una lista básica; si no, una lista especial (3, supuesto)
  // con el valor unitario en el pedido. Cofema (74.790 y 4.600 el kilo) no coincide: va con lista especial. Julio confirma cada una.
  function listaCliente(c) {
    const t = tarifaVigente(c) || (c.tarifas || [])[0] || {};
    const l = (!t.esquema || t.esquema === 'basico_kg') ? LISTAS_PRECIO_HELISA.find((x) => !x.especial && x.basico === t.basico && x.kg === t.precio_kg) : null;
    return l ? { id: l.id, estado: 'por confirmar' } : { id: '3', estado: 'por confirmar' };
  }
  clientes.forEach((c, i) => {
    const valido = c.estado !== 'pendiente_validar';
    c.helisa = {
      codigo_cliente: valido ? String(1001 + i) : '',
      codigo_estado: valido ? 'prueba' : 'falta', // prueba | confirmado | falta
      lista_precio: valido ? listaCliente(c).id : '',
      lista_estado: valido ? listaCliente(c).estado : 'falta', // 'por confirmar' siempre: Julio confirma la lista de cada cliente
      factura_por_sede: false,
      sedes: [{ sede: c.sede, codigo_cliente: valido ? String(1001 + i) : '' }],
    };
    c.fiscal = {
      tipo_persona: '', // juridica | natural (por confirmar con el RUT)
      tipo_documento: c.dv ? 'NIT' : '',
      responsabilidades: '', // p. ej. R-99-PN; por confirmar con el RUT del cliente
      regimen_iva: '',
      municipio_dane: DANE[c.ciudad] || '',
      correo_fe: '',
      completo: false,
    };
  });
  (function () { // datos fiscales de prueba solo en los clientes ficticios marcados
    const a = clientes.find((c) => c.id === 'c-prueba-kg');
    Object.assign(a.fiscal, { tipo_persona: 'juridica', responsabilidades: 'R-99-PN', regimen_iva: 'Dato de prueba', correo_fe: 'recepcion.fe@example.com', completo: true });
  })();

  const FRECUENCIA_LABEL = { semanal: 'Semanal', quincenal: 'Quincenal', mensual: 'Mensual', demanda: 'Por demanda' };
  const CARTERA_LABEL = { al_dia: 'Al día', en_mora: 'En mora', sin_info: 'Sin información' };
  const ESTADO_VISITA_LABEL = { borrador: 'Borrador', cerrada: 'Guardada en el celular', transmitida: 'Transmitida', rechazada: 'Rechazada', en_cierre: 'En el cierre', anulada: 'Anulada' };

  const periodos = [
    { id: '2026-08', nombre: 'Agosto 2026', inicio: '2026-07-27', fin: '2026-08-26', estado: 'cerrado', cerrado_en: '2026-08-26 17:20', cerrado_por: 'Lucrecia', clientes: 12, kg: 1842.4, visitas: 61 },
    { id: '2026-09', nombre: 'Septiembre 2026', inicio: '2026-08-27', fin: '2026-09-26', estado: 'cerrado', cerrado_en: '2026-09-26 17:41', cerrado_por: 'Lucrecia', version: 1, planilla_base: 22690, cierre_desde: '2026-09-20' },
    { id: '2026-10', nombre: 'Octubre 2026', inicio: '2026-09-27', fin: '2026-10-26', estado: 'abierto', cerrado_en: null, cerrado_por: null, cierre_desde: '2026-10-20' },
  ];

  // --- visitas ---------------------------------------------------------
  // kilos: objeto {codigo: kg}. Tipo: 'recoleccion' | 'fallida'.
  // estado: borrador | cerrada (en celular) | transmitida | rechazada | en_cierre | anulada
  const visitas = [
    // Cofema, septiembre 2026 (visitas y kilos reales de la planilla en papel; en el sistema, RH 22690-26)
    { id: 'v-cof-0905', consecutivo: 1092, cliente: 'c-cofema', periodo: '2026-09', fecha: '2026-09-05', hora: '10:15', hora_servidor: '10:16', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 39.35, ANATO: 35.6 }, bolsas: 8, guardianes: 0, entrega_nombre: 'Funcionario Cofema (prueba)', entrega_documento: '(dato de prueba)', gps: [1.6089, -75.6168], firmas: true, fotos: 0 },
    { id: 'v-cof-0912', consecutivo: 1101, cliente: 'c-cofema', periodo: '2026-09', fecha: '2026-09-12', hora: '09:37', hora_servidor: '09:37', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 41.7, ANATO: 61.8 }, bolsas: 10, guardianes: 0, entrega_nombre: 'Funcionario Cofema (prueba)', entrega_documento: '(dato de prueba)', gps: [1.6089, -75.6168], firmas: true, fotos: 0 },
    { id: 'v-cof-0919', consecutivo: 1118, cliente: 'c-cofema', periodo: '2026-09', fecha: '2026-09-19', hora: '09:45', hora_servidor: '09:46', operario: 'op-jesus', auxiliar: 'op-dubeny', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { ANATO: 77.4, RAEES: 67.5 }, bolsas: 12, guardianes: 0, entrega_nombre: 'Funcionario Cofema (prueba)', entrega_documento: '(dato de prueba)', gps: [1.6089, -75.6168], firmas: true, fotos: 1 },
    { id: 'v-cof-0922', consecutivo: 1124, cliente: 'c-cofema', periodo: '2026-09', fecha: '2026-09-22', hora: '10:30', hora_servidor: '10:31', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 40.3, ANATO: 50.2 }, bolsas: 9, guardianes: 0, entrega_nombre: 'Funcionario Cofema (prueba)', entrega_documento: '(dato de prueba)', gps: [1.6089, -75.6168], firmas: true, fotos: 0 },

    // Otros clientes, septiembre (resumen suficiente para el cierre)
    { id: 'v-sv-0901', consecutivo: 1088, cliente: 'c-saludvital', periodo: '2026-09', fecha: '2026-09-01', hora: '08:10', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 18.4, CORTO: 2.1, ANATO: 4.0 }, bolsas: 5, guardianes: 2, entrega_nombre: 'Enf. Marcela Ruiz', entrega_documento: '1.000.000.118', gps: [1.6152, -75.6113], firmas: true, fotos: 0 },
    { id: 'v-sv-0908', consecutivo: 1097, cliente: 'c-saludvital', periodo: '2026-09', fecha: '2026-09-08', hora: '08:05', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 16.9, CORTO: 1.8 }, bolsas: 4, guardianes: 2, entrega_nombre: 'Enf. Marcela Ruiz', entrega_documento: '1.000.000.118', gps: [1.6152, -75.6113], firmas: true, fotos: 0 },
    { id: 'v-sv-0915', consecutivo: 1108, cliente: 'c-saludvital', periodo: '2026-09', fecha: '2026-09-15', hora: '08:20', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 20.2, CORTO: 2.4, TOX: 1.5 }, bolsas: 6, guardianes: 2, entrega_nombre: 'Enf. Marcela Ruiz', entrega_documento: '1.000.000.118', gps: [1.6152, -75.6113], firmas: true, fotos: 0 },
    { id: 'v-sv-0922', consecutivo: 1125, cliente: 'c-saludvital', periodo: '2026-09', fecha: '2026-09-22', hora: '08:00', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 17.3, CORTO: 2.0 }, bolsas: 5, guardianes: 2, entrega_nombre: 'Enf. Marcela Ruiz', entrega_documento: '1.000.000.118', gps: [1.6152, -75.6113], firmas: true, fotos: 0 },
    { id: 'v-lab-0902', consecutivo: 1090, cliente: 'c-labamazonia', periodo: '2026-09', fecha: '2026-09-02', hora: '11:05', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 6.2, CORTO: 1.1, REACT: 3.4 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Bact. Sandra Gómez', entrega_documento: '1.000.000.310', gps: [1.6201, -75.6049], firmas: true, fotos: 0 },
    { id: 'v-lab-0916', consecutivo: 1110, cliente: 'c-labamazonia', periodo: '2026-09', fecha: '2026-09-16', hora: '11:20', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 5.8, CORTO: 0.9, REACT: 2.6 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Bact. Sandra Gómez', entrega_documento: '1.000.000.310', gps: [1.6201, -75.6049], firmas: true, fotos: 0 },
    { id: 'v-vs-0904', consecutivo: 1091, cliente: 'c-visionsur', periodo: '2026-09', fecha: '2026-09-04', hora: '14:10', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 9.4, CORTO: 1.2 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Aux. Liliana Peña', entrega_documento: '1.000.000.556', gps: [1.6170, -75.6080], firmas: true, fotos: 0 },
    { id: 'v-vs-0911', consecutivo: 1100, cliente: 'c-visionsur', periodo: '2026-09', fecha: '2026-09-11', hora: '14:00', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 8.1, CORTO: 1.0 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Aux. Liliana Peña', entrega_documento: '1.000.000.556', gps: [1.6170, -75.6080], firmas: true, fotos: 0 },
    { id: 'v-vs-0918', consecutivo: 1115, cliente: 'c-visionsur', periodo: '2026-09', fecha: '2026-09-18', hora: '14:25', operario: 'op-jesus', auxiliar: 'op-dubeny', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 10.6, CORTO: 1.3 }, bolsas: 4, guardianes: 1, entrega_nombre: 'Aux. Liliana Peña', entrega_documento: '1.000.000.556', gps: [1.6170, -75.6080], firmas: true, fotos: 0 },
    { id: 'v-vs-0925', consecutivo: 1131, cliente: 'c-visionsur', periodo: '2026-09', fecha: '2026-09-25', hora: '14:05', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 7.9, CORTO: 0.8 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Aux. Liliana Peña', entrega_documento: '1.000.000.556', gps: [1.6170, -75.6080], firmas: true, fotos: 0 },
    { id: 'v-son-0903', consecutivo: 1089, cliente: 'c-sonrisas', periodo: '2026-09', fecha: '2026-09-03', hora: '15:30', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 3.2, CORTO: 0.6 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Dra. Patricia Londoño', entrega_documento: '1.000.000.029', gps: [1.6145, -75.6101], firmas: true, fotos: 0 },
    { id: 'v-eco-0918', consecutivo: 1116, cliente: 'c-economia', periodo: '2026-09', fecha: '2026-09-18', hora: '16:40', operario: 'op-jesus', auxiliar: 'op-dubeny', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 2.1, CORTO: 0.4, TOX: 3.8 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Arnulfo Cabrera', entrega_documento: '1.000.000.452', gps: [1.4877, -75.7236], firmas: true, fotos: 0, recibo: 'r-35671' },
    { id: 'v-hue-0904', consecutivo: 1093, cliente: 'c-huellas', periodo: '2026-09', fecha: '2026-09-04', hora: '09:50', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 4.6, CORTO: 0.7, ANATO: 6.3 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Dr. Mauricio Trujillo', entrega_documento: '1.000.000.334', gps: [1.6233, -75.6002], firmas: true, fotos: 0 },
    { id: 'v-hue-0918', consecutivo: 1117, cliente: 'c-huellas', periodo: '2026-09', fecha: '2026-09-18', hora: '09:55', operario: 'op-jesus', auxiliar: 'op-dubeny', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 5.1, CORTO: 0.8, ANATO: 4.9 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Dr. Mauricio Trujillo', entrega_documento: '1.000.000.334', gps: [1.6233, -75.6002], firmas: true, fotos: 0 },
    { id: 'v-pv-0914', consecutivo: 1105, cliente: 'c-pielviva', periodo: '2026-09', fecha: '2026-09-14', hora: '16:10', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 2.4, CORTO: 0.5 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Yurany Ortiz', entrega_documento: '1.000.000.098', gps: [1.6110, -75.6150], firmas: true, fotos: 0, recibo: 'r-35670' },
    { id: 'v-tn-0922', consecutivo: 1126, cliente: 'c-tinta', periodo: '2026-09', fecha: '2026-09-22', hora: '15:15', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 1.6, CORTO: 0.9 }, bolsas: 1, guardianes: 2, entrega_nombre: 'Kevin Sánchez', entrega_documento: '1.000.000.120', gps: [1.6138, -75.6122], firmas: true, fotos: 0, recibo: 'r-35673' },
    { id: 'v-ram-0902', consecutivo: 1087, cliente: 'c-ramirez', periodo: '2026-09', fecha: '2026-09-02', hora: '08:45', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 2.8, CORTO: 0.7 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Luz Dary Ortega', entrega_documento: '1.000.000.112', gps: [1.6160, -75.6090], firmas: true, fotos: 0 },
    { id: 'v-oli-0906', consecutivo: 1095, cliente: 'c-olivos', periodo: '2026-09', fecha: '2026-09-06', hora: '07:40', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 6.0, ANATO: 9.7 }, bolsas: 4, guardianes: 0, entrega_nombre: 'Hernán Vargas', entrega_documento: '1.000.000.871', gps: [1.6190, -75.6120], firmas: true, fotos: 0 },
    { id: 'v-oli-0920', consecutivo: 1120, cliente: 'c-olivos', periodo: '2026-09', fecha: '2026-09-20', hora: '07:35', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 5.4, ANATO: 8.2 }, bolsas: 4, guardianes: 0, entrega_nombre: 'Hernán Vargas', entrega_documento: '1.000.000.871', gps: [1.6190, -75.6120], firmas: true, fotos: 0 },
    { id: 'v-tre-0909', consecutivo: 1098, cliente: 'c-trebol', periodo: '2026-09', fecha: '2026-09-09', hora: '12:30', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 2.2, CORTO: 0.5, TOX: 1.9 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Marleny D.', entrega_documento: '1.000.000.215', gps: [1.4869, -75.7249], firmas: true, fotos: 0 },
    { id: 'v-tre-0923', consecutivo: 1128, cliente: 'c-trebol', periodo: '2026-09', fecha: '2026-09-23', hora: '12:40', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 1.9, CORTO: 0.4, TOX: 2.3 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Marleny D.', entrega_documento: '1.000.000.215', gps: [1.4869, -75.7249], firmas: true, fotos: 0 },

    // Octubre 2026 (periodo abierto; "hoy" es jueves 22 de octubre)
    { id: 'v-sv-0928', consecutivo: 1135, cliente: 'c-saludvital', periodo: '2026-10', fecha: '2026-09-28', hora: '08:05', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 19.1, CORTO: 2.2 }, bolsas: 5, guardianes: 2, entrega_nombre: 'Enf. Marcela Ruiz', entrega_documento: '1.000.000.118', gps: [1.6152, -75.6113], firmas: true, fotos: 0 },
    { id: 'v-cof-1003', consecutivo: 1140, cliente: 'c-cofema', periodo: '2026-10', fecha: '2026-10-03', hora: '10:05', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 37.8, ANATO: 41.2 }, bolsas: 9, guardianes: 0, entrega_nombre: 'Funcionario Cofema (prueba)', entrega_documento: '(dato de prueba)', gps: [1.6089, -75.6168], firmas: true, fotos: 0 },
    { id: 'v-sv-1005', consecutivo: 1143, cliente: 'c-saludvital', periodo: '2026-10', fecha: '2026-10-05', hora: '08:15', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 17.6, CORTO: 1.9, ANATO: 3.1 }, bolsas: 5, guardianes: 2, entrega_nombre: 'Enf. Marcela Ruiz', entrega_documento: '1.000.000.118', gps: [1.6152, -75.6113], firmas: true, fotos: 0 },
    { id: 'v-lab-1006', consecutivo: 1145, cliente: 'c-labamazonia', periodo: '2026-10', fecha: '2026-10-06', hora: '11:10', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 6.5, CORTO: 1.0, REACT: 3.1 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Bact. Sandra Gómez', entrega_documento: '1.000.000.310', gps: [1.6201, -75.6049], firmas: true, fotos: 0 },
    { id: 'v-son-1001', consecutivo: 1138, cliente: 'c-sonrisas', periodo: '2026-10', fecha: '2026-10-01', hora: '15:20', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 3.4, CORTO: 0.7 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Dra. Patricia Londoño', entrega_documento: '1.000.000.029', gps: [1.6145, -75.6101], firmas: true, fotos: 0, recibo: 'r-35680' },
    { id: 'v-hue-1002', consecutivo: 1139, cliente: 'c-huellas', periodo: '2026-10', fecha: '2026-10-02', hora: '09:40', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 4.9, CORTO: 0.6, ANATO: 5.5, ANIMAL: 3.2 }, bolsas: 4, guardianes: 1, entrega_nombre: 'Dr. Mauricio Trujillo', entrega_documento: '1.000.000.334', gps: [1.6233, -75.6002], firmas: true, fotos: 0, alerta: 'Incluye 3,2 kg de Animales: categoría sin tratamiento definido' },
    { id: 'v-vs-1002', consecutivo: 1141, cliente: 'c-visionsur', periodo: '2026-10', fecha: '2026-10-02', hora: '14:15', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 9.0, CORTO: 1.1 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Aux. Liliana Peña', entrega_documento: '1.000.000.556', gps: [1.6170, -75.6080], firmas: true, fotos: 0 },
    { id: 'v-vs-1009', consecutivo: 1149, cliente: 'c-visionsur', periodo: '2026-10', fecha: '2026-10-09', hora: '14:05', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 8.6, CORTO: 1.0 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Aux. Liliana Peña', entrega_documento: '1.000.000.556', gps: [1.6170, -75.6080], firmas: true, fotos: 0 },
    { id: 'v-ram-1007', consecutivo: 1146, cliente: 'c-ramirez', periodo: '2026-10', fecha: '2026-10-07', hora: '08:50', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'fallida', estado: 'transmitida', kilos: {}, bolsas: 0, guardianes: 0, motivo_fallida: 'Consultorio cerrado; aviso en la puerta de vacaciones hasta el 13 de octubre', testigo: 'Vigilante del edificio, Óscar Ríos', gps: [1.6160, -75.6090], firmas: false, fotos: 2 },
    { id: 'v-oli-1004', consecutivo: 1142, cliente: 'c-olivos', periodo: '2026-10', fecha: '2026-10-04', hora: '07:45', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 5.7, ANATO: 10.4 }, bolsas: 4, guardianes: 0, entrega_nombre: 'Hernán Vargas', entrega_documento: '1.000.000.871', gps: [1.6190, -75.6120], firmas: true, fotos: 0 },
    { id: 'v-tre-1007', consecutivo: 1147, cliente: 'c-trebol', periodo: '2026-10', fecha: '2026-10-07', hora: '12:35', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 2.0, CORTO: 0.5, TOX: 2.1 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Marleny D.', entrega_documento: '1.000.000.215', gps: [1.4869, -75.7249], firmas: true, fotos: 0 },
    { id: 'v-cof-1010', consecutivo: 1150, cliente: 'c-cofema', periodo: '2026-10', fecha: '2026-10-10', hora: '10:20', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 42.1, ANATO: 58.3 }, bolsas: 11, guardianes: 0, entrega_nombre: 'Funcionario Cofema (prueba)', entrega_documento: '(dato de prueba)', gps: [1.6089, -75.6168], firmas: true, fotos: 0 },
    { id: 'v-sv-1012', consecutivo: 1152, cliente: 'c-saludvital', periodo: '2026-10', fecha: '2026-10-12', hora: '08:10', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 18.8, CORTO: 2.3 }, bolsas: 5, guardianes: 2, entrega_nombre: 'Enf. Marcela Ruiz', entrega_documento: '1.000.000.118', gps: [1.6152, -75.6113], firmas: true, fotos: 0 },
    { id: 'v-pv-1012', consecutivo: 1153, cliente: 'c-pielviva', periodo: '2026-10', fecha: '2026-10-12', hora: '16:05', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 2.6, CORTO: 0.4 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Yurany Ortiz', entrega_documento: '1.000.000.098', gps: [1.6110, -75.6150], firmas: true, fotos: 0, recibo: 'r-35686' },
    { id: 'v-vs-1016', consecutivo: 1156, cliente: 'c-visionsur', periodo: '2026-10', fecha: '2026-10-16', hora: '14:10', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 9.8, CORTO: 1.2 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Aux. Liliana Peña', entrega_documento: '1.000.000.556', gps: [1.6170, -75.6080], firmas: true, fotos: 0 },
    { id: 'v-eco-1016', consecutivo: 1157, cliente: 'c-economia', periodo: '2026-10', fecha: '2026-10-16', hora: '16:30', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 2.3, CORTO: 0.5, TOX: 3.1 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Arnulfo Cabrera', entrega_documento: '1.000.000.452', gps: [1.4877, -75.7236], firmas: true, fotos: 0, recibo: 'r-35687' },
    { id: 'v-nue-1016', consecutivo: 1158, cliente: 'c-nueva', periodo: '2026-10', fecha: '2026-10-16', hora: '17:10', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'rechazada', kilos: { BIO: 1.8, CORTO: 0.3 }, bolsas: 1, guardianes: 1, entrega_nombre: 'Rosalba Méndez', entrega_documento: '0.000.000.118', gps: [1.6260, -75.5980], firmas: true, fotos: 0, rechazo: 'Cliente creado en campo sin validar: falta dígito de verificación y tarifa. La oficina debe validar el cliente y reprocesar.' },
    { id: 'v-cof-1017', consecutivo: 1186, cliente: 'c-cofema', periodo: '2026-10', fecha: '2026-10-17', hora: '10:12', hora_servidor: '10:14', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 39.9, ANATO: 47.6, RAEES: 12.0 }, bolsas: 10, guardianes: 0, entrega_nombre: 'Funcionario Cofema (prueba)', entrega_documento: '(dato de prueba)', gps: [1.6089, -75.6168], firmas: true, fotos: 1 },
    { id: 'v-oli-1018', consecutivo: 1208, cliente: 'c-olivos', periodo: '2026-10', fecha: '2026-10-18', hora: '07:50', operario: 'op-jesus', auxiliar: 'op-dubeny', placa: 'UQX 904', tipo: 'recoleccion', estado: 'cerrada', kilos: { BIO: 5.2, ANATO: 9.1 }, bolsas: 4, guardianes: 0, entrega_nombre: 'Hernán Vargas', entrega_documento: '1.000.000.871', gps: [1.6190, -75.6120], firmas: true, fotos: 0, pendiente_desde: '2026-10-18 07:52', intentos: 3, ultimo_error: 'Sin conexión' },
    { id: 'v-lab-1020a', consecutivo: 1154, cliente: 'c-labamazonia', periodo: '2026-10', fecha: '2026-10-13', hora: '11:00', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'anulada', kilos: { BIO: 60.2, CORTO: 1.0, REACT: 2.9 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Bact. Sandra Gómez', entrega_documento: '1.000.000.310', gps: [1.6201, -75.6049], firmas: true, fotos: 0, anulada_por: 'Lucrecia', anulada_en: '2026-10-13 15:40', anulacion_motivo: 'Error de digitación: 60,2 kg de biológicos en lugar de 6,2. Se emitió la constancia 1155 en reemplazo.', reemplazo: 'v-lab-1020b' },
    { id: 'v-lab-1020b', consecutivo: 1155, cliente: 'c-labamazonia', periodo: '2026-10', fecha: '2026-10-13', hora: '11:00', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 6.2, CORTO: 1.0, REACT: 2.9 }, bolsas: 3, guardianes: 1, entrega_nombre: 'Bact. Sandra Gómez', entrega_documento: '1.000.000.310', gps: [1.6201, -75.6049], firmas: true, fotos: 0, reemplaza: 'v-lab-1020a' },
    // v6: la visita del lunes 19 ya se cerró y transmitió ("hoy" pasa a ser el jueves 22)
    { id: 'v-sv-1019', consecutivo: 1187, cliente: 'c-saludvital', periodo: '2026-10', fecha: '2026-10-19', hora: '08:02', hora_servidor: '08:03', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 16.4, CORTO: 2.1 }, bolsas: 4, guardianes: 2, entrega_nombre: 'Enf. Marcela Ruiz', entrega_documento: '1.000.000.118', gps: [1.6152, -75.6113], firmas: true, fotos: 0 },
    { id: 'v-ram-1019', consecutivo: 1188, cliente: 'c-ramirez', periodo: '2026-10', fecha: '2026-10-19', hora: '10:34', hora_servidor: '10:35', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 2.6, CORTO: 0.6 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Luz Dary Ortega', entrega_documento: '1.000.000.112', gps: [1.6160, -75.6090], firmas: true, fotos: 0, nota: 'Reprogramada después de la visita fallida del 7 de octubre' },
    // v6 · clientes ficticios de prueba (esquemas «solo por kilo» y «fijo»)
    { id: 'v-pkg-0930', consecutivo: 1201, cliente: 'c-prueba-kg', periodo: '2026-10', fecha: '2026-09-30', hora: '09:10', hora_servidor: '09:11', operario: 'op-jesus', auxiliar: 'op-dubeny', placa: 'UQX 904', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 22.4, CORTO: 4.7 }, bolsas: 7, guardianes: 2, entrega_nombre: 'Funcionario de prueba', entrega_documento: '(dato de prueba)', gps: [1.6140, -75.6110], firmas: true, fotos: 0 },
    { id: 'v-pkg-1007', consecutivo: 1203, cliente: 'c-prueba-kg', periodo: '2026-10', fecha: '2026-10-07', hora: '09:05', hora_servidor: '09:05', operario: 'op-jesus', auxiliar: 'op-dubeny', placa: 'UQX 904', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 21.95, CORTO: 4.9 }, bolsas: 7, guardianes: 2, entrega_nombre: 'Funcionario de prueba', entrega_documento: '(dato de prueba)', gps: [1.6140, -75.6110], firmas: true, fotos: 0 },
    { id: 'v-pkg-1014', consecutivo: 1205, cliente: 'c-prueba-kg', periodo: '2026-10', fecha: '2026-10-14', hora: '09:20', hora_servidor: '09:21', operario: 'op-jesus', auxiliar: 'op-dubeny', placa: 'UQX 904', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 23.1, CORTO: 4.3 }, bolsas: 7, guardianes: 2, entrega_nombre: 'Funcionario de prueba', entrega_documento: '(dato de prueba)', gps: [1.6140, -75.6110], firmas: true, fotos: 0 },
    { id: 'v-pkg-1021', consecutivo: 1209, cliente: 'c-prueba-kg', periodo: '2026-10', fecha: '2026-10-21', hora: '09:00', hora_servidor: '09:02', operario: 'op-jesus', auxiliar: 'op-dubeny', placa: 'UQX 904', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 22.65, CORTO: 4.5 }, bolsas: 7, guardianes: 2, entrega_nombre: 'Funcionario de prueba', entrega_documento: '(dato de prueba)', gps: [1.6140, -75.6110], firmas: true, fotos: 0 },
    { id: 'v-pfi-1006', consecutivo: 1144, cliente: 'c-prueba-fijo', periodo: '2026-10', fecha: '2026-10-06', hora: '09:30', hora_servidor: '09:31', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 1.4, CORTO: 0.5 }, bolsas: 1, guardianes: 1, entrega_nombre: 'Funcionario de prueba', entrega_documento: '(dato de prueba)', gps: [1.6150, -75.6100], firmas: true, fotos: 0 },
    // Hoy, jueves 22 de octubre: visita en curso (borrador en el celular de Dubeny)
    { id: 'v-hue-1022', consecutivo: null, cliente: 'c-huellas', periodo: '2026-10', fecha: '2026-10-22', hora: '08:40', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'borrador', kilos: { BIO: 4.2 }, bolsas: 3, guardianes: 0, entrega_nombre: '', entrega_documento: '', gps: [1.6233, -75.6002], firmas: false, fotos: 0 },
  ];

  // Ruta del día (jueves 22 de octubre de 2026) para Dubeny
  const ruta_hoy = [
    { cliente: 'c-huellas', hora_sugerida: '08:30', estado: 'en_curso', nota: 'Puede traer residuos de animales' },
    { cliente: 'c-labamazonia', hora_sugerida: '10:30', estado: 'pendiente', nota: 'Reprogramada del martes 20' },
    { cliente: 'c-tinta', hora_sugerida: '15:00', estado: 'pendiente', nota: 'Sin visita en octubre; paga en efectivo' },
  ];

  // Recibos de caja (solo efectivo)
  const recibos = [
    { id: 'r-35670', consecutivo: 35670, cliente: 'c-pielviva', visita: 'v-pv-0914', fecha: '2026-09-14', hora: '16:22', operario: 'op-dubeny', valor: 49980, concepto: 'Servicio especial de aseo, agosto de 2026 (factura FVE 25702)', pagador: 'Yurany Ortiz', pagador_documento: '1.000.000.098', estado: 'emitido', conciliado: true },
    { id: 'r-35671', consecutivo: 35671, cliente: 'c-economia', visita: 'v-eco-0918', fecha: '2026-09-18', hora: '16:55', operario: 'op-jesus', valor: 53550, concepto: 'Servicio especial de aseo, agosto de 2026 (factura FVE 25699)', pagador: 'Arnulfo Cabrera', pagador_documento: '1.000.000.452', estado: 'emitido', conciliado: true },
    // Abono de prueba de Cofema (el mismo del levantamiento y la SPEC): $500.000 a la FVE 25756, que queda con saldo de $1.744.935
    { id: 'r-35672', consecutivo: 35672, cliente: 'c-cofema', visita: null, fecha: '2026-09-26', hora: '11:20', operario: 'op-dubeny', valor: 500000, concepto: 'Abono a la factura FVE 25756 · septiembre de 2026 (dato de prueba)', pagador: 'Funcionario Cofema (prueba)', pagador_documento: '(dato de prueba)', estado: 'emitido', conciliado: true, dato_prueba: true },
    { id: 'r-35673', consecutivo: 35673, cliente: 'c-tinta', visita: 'v-tn-0922', fecha: '2026-09-22', hora: '15:28', operario: 'op-dubeny', valor: 47600, concepto: 'Servicio especial de aseo, agosto de 2026 (factura FVE 25710)', pagador: 'Kevin Sánchez', pagador_documento: '1.000.000.120', estado: 'emitido', conciliado: true },
    { id: 'r-35680', consecutivo: 35680, cliente: 'c-sonrisas', visita: 'v-son-1001', fecha: '2026-10-01', hora: '15:34', operario: 'op-dubeny', valor: 0, concepto: '', pagador: 'Dra. Patricia Londoño', pagador_documento: '1.000.000.029', estado: 'emitido', conciliado: false },
    { id: 'r-35685', consecutivo: 35685, cliente: 'c-tinta', visita: null, fecha: '2026-10-09', hora: '11:40', operario: 'op-dubeny', valor: 47600, concepto: 'Servicio especial de aseo, septiembre de 2026', pagador: 'Kevin Sánchez', pagador_documento: '1.000.000.120', estado: 'anulado', conciliado: false, anulado_por: 'Lucrecia', anulado_en: '2026-10-09 14:05', anulacion_motivo: 'Valor incorrecto: la factura de septiembre fue $50.337. Se emitió el recibo 35686.' },
    { id: 'r-35686', consecutivo: 35686, cliente: 'c-pielviva', visita: 'v-pv-1012', fecha: '2026-10-12', hora: '16:18', operario: 'op-dubeny', valor: 51408, concepto: 'Servicio especial de aseo, septiembre de 2026 (factura FVE 25781)', pagador: 'Yurany Ortiz', pagador_documento: '1.000.000.098', estado: 'emitido', conciliado: false },
    { id: 'r-35687', consecutivo: 35687, cliente: 'c-economia', visita: 'v-eco-1016', fecha: '2026-10-16', hora: '16:48', operario: 'op-dubeny', valor: 53550, concepto: 'Servicio especial de aseo, septiembre de 2026 (factura FVE 25779)', pagador: 'Arnulfo Cabrera', pagador_documento: '1.000.000.452', estado: 'emitido', conciliado: false },
  ];

  const actas = [
    { id: 'a-25729', consecutivo: 25729, cliente: 'c-cofema', periodo: '2026-09', fecha: '2026-09-26', estado: 'emitida', aprobada_por: 'Diego', aprobada_en: '2026-09-26 18:05', publicada: true },
    { id: 'a-25730', consecutivo: 25730, cliente: 'c-saludvital', periodo: '2026-09', fecha: '2026-09-26', estado: 'retenida', aprobada_por: 'Diego', aprobada_en: '2026-09-26 18:06', publicada: false, retenida_motivo: 'Cliente en mora: factura FVE 25745 vencida el 24 de septiembre' },
  ];

  const auditoria = [
    // v6 · del lunes 19 al jueves 22 de octubre (cierres anticipados, pedidos y archivo RC)
    { en: '2026-10-22 08:40', quien: 'Dubeny', accion: 'Abrió visita (borrador)', entidad: 'Visita · Veterinaria Huellas', detalle: 'Desde el celular Samsung A35' },
    { en: '2026-10-22 08:20', quien: 'Lucrecia', accion: 'Cerró el cliente (cierre anticipado)', entidad: 'Cierre · Consultorio Dr. Ramírez · Octubre 2026', detalle: 'RH 22705-26 · 3,20 kg · $54.740 · falta generar el pedido' },
    { en: '2026-10-22 08:15', quien: 'Lucrecia', accion: 'Cerró el cliente (cierre anticipado)', entidad: 'Cierre · Sonrisas del Caquetá · Octubre 2026', detalle: 'RH 22704-26 · 4,10 kg · $57.120 · falta generar el pedido' },
    { en: '2026-10-21 16:13', quien: 'Lucrecia', accion: 'Descargó el archivo de pedidos', entidad: 'Pedidos · COMSERVA_OP_2026-10_002.txt', detalle: 'OP 114 · Centro Clínico de Prueba · falta importarlo en Helisa' },
    { en: '2026-10-21 16:05', quien: 'Lucrecia', accion: 'Cerró el cliente (cierre anticipado)', entidad: 'Cierre · Centro Clínico de Prueba · Octubre 2026', detalle: 'RH 22703-26 · 108,50 kg · $515.375,43 (solo por kilo)' },
    { en: '2026-10-21 09:02', quien: 'Servidor', accion: 'Transmitida constancia 1209', entidad: 'Visita · Centro Clínico de Prueba', detalle: '27,15 kg' },
    { en: '2026-10-20 11:02', quien: 'Lucrecia', accion: 'Marcó importado en Helisa el archivo de pedidos', entidad: 'Pedidos · COMSERVA_OP_2026-10_001.txt', detalle: 'OP 113 · Consultorio de Prueba' },
    { en: '2026-10-20 10:30', quien: 'Lucrecia', accion: 'Cerró el cliente (cierre anticipado)', entidad: 'Cierre · Consultorio de Prueba · Octubre 2026', detalle: 'RH 22702-26 · $29.750 (cobro fijo)' },
    { en: '2026-10-20 09:40', quien: 'Lucrecia', accion: 'Registró el recibo definitivo RC 8851', entidad: 'Archivo plano · COMSERVA_RC_2026-10_001', detalle: 'Recibo 35680 de Sonrisas del Caquetá cruzado con su factura de septiembre' },
    { en: '2026-10-20 09:15', quien: 'Lucrecia', accion: 'Generó archivo plano RC', entidad: 'Archivo plano · COMSERVA_RC_2026-10_001', detalle: '1 recibo entregado; plantilla RC v1' },
    { en: '2026-10-19 10:35', quien: 'Servidor', accion: 'Transmitida constancia 1188', entidad: 'Visita · Consultorio Dr. Ramírez', detalle: 'Reprogramada después de la visita fallida del 7 de octubre' },
    { en: '2026-10-19 08:03', quien: 'Servidor', accion: 'Transmitida constancia 1187', entidad: 'Visita · IPS Salud Vital', detalle: '18,50 kg' },
    { en: '2026-10-19 08:02', quien: 'Dubeny', accion: 'Abrió visita (borrador)', entidad: 'Visita · IPS Salud Vital', detalle: 'Desde el celular Samsung A35' },
    { en: '2026-10-18 07:52', quien: 'Jesús', accion: 'Cerró visita 1208 (en el celular)', entidad: 'Visita · Funeraria Los Olivos', detalle: 'Sin señal; en cola de envío' },
    { en: '2026-10-17 16:10', quien: 'Diego', accion: 'Consultó recaudo del día', entidad: 'Reportes', detalle: '' },
    { en: '2026-10-17 10:14', quien: 'Servidor', accion: 'Transmitida constancia 1186', entidad: 'Visita · Cofema', detalle: 'Hora del celular 10:12, del servidor 10:14' },
    { en: '2026-10-16 17:12', quien: 'Servidor', accion: 'Rechazó visita 1158', entidad: 'Visita · Droguería Nueva Esperanza', detalle: 'Cliente pendiente de validar' },
    { en: '2026-10-16 17:05', quien: 'Dubeny', accion: 'Creó cliente en campo', entidad: 'Cliente · Droguería Nueva Esperanza', detalle: 'Pendiente de validar por la oficina' },
    { en: '2026-10-13 15:40', quien: 'Lucrecia', accion: 'Anuló visita 1154', entidad: 'Visita · Laboratorio Amazonía', detalle: 'Motivo: error de digitación (60,2 kg). Reemplazo: 1155' },
    { en: '2026-10-09 14:05', quien: 'Lucrecia', accion: 'Anuló recibo 35685', entidad: 'Recibo de caja · Tinta Negra', detalle: 'Valor incorrecto' },
    { en: '2026-10-10 11:20', quien: 'Lucrecia', accion: 'Marcó pago por transferencia', entidad: 'Factura · Visión Sur FVE 25764', detalle: 'Bancolombia ref. 884120; solo saldo de referencia' },
    { en: '2026-09-29 10:12', quien: 'Lucrecia', accion: 'Registró recibos definitivos RC 8812–8815', entidad: 'Archivo plano · COMSERVA_RC_2026-09_001', detalle: 'Cruce hecho en Helisa por DOC FUENTE; con el abono de prueba de Cofema (recibo 35672 → RC 8815) la FVE 25756 queda con saldo de $1.744.935' },
    { en: '2026-09-29 09:50', quien: 'Lucrecia', accion: 'Generó archivo plano RC', entidad: 'Archivo plano · COMSERVA_RC_2026-09_001', detalle: '4 recibos entregados (incluye el abono de prueba de Cofema); plantilla RC v1' },
    // v6 · septiembre contado con pedidos (propuesta 1): cada propuesta ajusta estos textos a su flujo
    { en: '2026-09-28 09:40', quien: 'Lucrecia', accion: 'Registró 11 FVE (25757–25767) desde el listado de facturas de Helisa', entidad: 'Periodo · Septiembre 2026', detalle: 'Validadas contra el RH (± $1); cierres → facturados' },
    { en: '2026-09-28 07:40', quien: 'Lucrecia', accion: 'Recibió el efectivo del recibo 35672', entidad: 'Recibo de caja · Cofema S.A.', detalle: 'Abono de prueba de $500.000 a la FVE 25756' },
    { en: '2026-09-27 09:40', quien: 'Lucrecia', accion: 'Marcó importado en Helisa el archivo de pedidos', entidad: 'Pedidos · COMSERVA_OP_2026-09_003.txt', detalle: '11 pedidos (OP 102–112)' },
    { en: '2026-09-27 09:05', quien: 'Lucrecia', accion: 'Generó el archivo de pedidos', entidad: 'Pedidos · COMSERVA_OP_2026-09_003.txt', detalle: '11 pedidos; Droguería El Trébol ya existe en Helisa' },
    { en: '2026-09-27 08:20', quien: 'Lucrecia', accion: 'Marcó el archivo de pedidos como rechazado', entidad: 'Pedidos · COMSERVA_OP_2026-09_002.txt', detalle: 'Helisa: el código de cliente de Droguería El Trébol no existe' },
    { en: '2026-09-26 18:05', quien: 'Diego', accion: 'Aprobó y firmó 12 actas', entidad: 'Periodo · Septiembre 2026', detalle: 'Complemento C1 (anticipo)' },
    { en: '2026-09-26 17:50', quien: 'Lucrecia', accion: 'Generó el archivo de pedidos', entidad: 'Pedidos · COMSERVA_OP_2026-09_002.txt', detalle: '11 pedidos' },
    { en: '2026-09-26 17:41', quien: 'Lucrecia', accion: 'Cerró el periodo', entidad: 'Periodo · Septiembre 2026', detalle: '11 clientes en el corte (Cofema se cerró el 22); 12 RH en total' },
    { en: '2026-09-26 11:20', quien: 'Dubeny', accion: 'Emitió el recibo de caja 35672 (abono de prueba)', entidad: 'Recibo de caja · Cofema S.A.', detalle: '$500.000 aplicados a la FVE 25756; saldo de referencia $1.744.935' },
    { en: '2026-09-23 16:40', quien: 'Lucrecia', accion: 'Registró la FVE 25756', entidad: 'Cierre · Cofema S.A. · Septiembre 2026', detalle: 'Digitada en el panel; igual al RH 22690-26 ($2.244.935)' },
    { en: '2026-09-23 08:10', quien: 'Lucrecia', accion: 'Marcó importado en Helisa el archivo de pedidos', entidad: 'Pedidos · COMSERVA_OP_2026-09_001.txt', detalle: 'OP 101 · Cofema' },
    { en: '2026-09-22 15:32', quien: 'Lucrecia', accion: 'Generó el archivo de pedidos', entidad: 'Pedidos · COMSERVA_OP_2026-09_001.txt', detalle: 'OP 101 · Cofema' },
    { en: '2026-09-22 15:20', quien: 'Lucrecia', accion: 'Cerró el cliente (cierre anticipado)', entidad: 'Cierre · Cofema S.A. · Septiembre 2026', detalle: 'RH 22690-26 · 413,85 kg · $2.244.935' },
  ];

  // --- helpers ----------------------------------------------------------
  // v6: Helisa liquida con centavos (FVE 25997: $515.375,43). Los pesos se muestran sin decimales salvo que haya centavos.
  const r2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;
  const fmtCOP = (n) => { const v = r2(n || 0); const cent = Math.abs(Math.round(v * 100) % 100) !== 0; return (v < 0 ? '−$' : '$') + Math.abs(v).toLocaleString('es-CO', { minimumFractionDigits: cent ? 2 : 0, maximumFractionDigits: cent ? 2 : 0 }); };
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
  // P1: una visita guardada en el celular sin transmitir ('cerrada') no cuenta en el cierre ni en el pedido (regla del cierre)
  function visitasDe(clienteId, periodoId, opts = {}) {
    return visitas.filter((v) => v.cliente === clienteId && v.periodo === periodoId && (opts.todas || (v.tipo === 'recoleccion' && v.estado !== 'anulada' && v.estado !== 'borrador' && v.estado !== 'rechazada' && v.estado !== 'cerrada')));
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
  // Liquidación v6 con los TRES esquemas y el redondeo de Helisa (a centavos, como la FVE 25997):
  //   basico_kg : subtotal = básico + max(0, kg − incluidos) × precio      (Cofema: $1.886.500 + IVA = $2.244.935)
  //   solo_kg   : subtotal = kg × precio                                    (108,50 × $3.991,60 = $433.088,60 + IVA = $515.375,43)
  //   fijo      : subtotal = valor fijo                                     ($25.000 + IVA = $29.750; $30.000 + IVA = $35.700)
  //   IVA = r2(subtotal × IVA %); total = r2(subtotal + IVA). IVA sobre el subtotal: si Helisa lo calcula línea por línea puede
  //   variar un centavo (por confirmar con Julio). Los campos de la v5 (basico, incluidos, adicionales, precio_kg,
  //   valorAdicionales) se conservan para que las páginas de la v5 sigan funcionando.
  function calcularFactura(tarifa, kg) {
    if (!tarifa) return null;
    const esquema = tarifa.esquema || 'basico_kg';
    kg = r2(kg);
    let basico = 0, incluidos = 0, adicionales = 0, precio_kg = 0, valorAdicionales = 0;
    if (esquema === 'solo_kg') { precio_kg = tarifa.precio_kg; adicionales = kg; valorAdicionales = r2(kg * precio_kg); }
    else if (esquema === 'fijo') { basico = tarifa.valor_fijo ?? tarifa.basico; }
    else { basico = tarifa.basico; incluidos = tarifa.kg_incluidos; precio_kg = tarifa.precio_kg; adicionales = Math.max(0, r2(kg - incluidos)); valorAdicionales = r2(adicionales * precio_kg); }
    const subtotal = r2(basico + valorAdicionales);
    const iva = r2(subtotal * tarifa.iva_pct / 100);
    // Líneas del documento de venta (concepto de Helisa por componente; ver equivalencias_helisa)
    const lineas = [];
    if (esquema === 'basico_kg') { lineas.push({ componente: 'basico', cantidad: 1, unitario: basico, valor: basico }); if (adicionales > 0) lineas.push({ componente: 'kg_adicionales', cantidad: adicionales, unitario: precio_kg, valor: valorAdicionales }); }
    if (esquema === 'solo_kg') lineas.push({ componente: 'kg_todos', cantidad: kg, unitario: precio_kg, valor: valorAdicionales });
    if (esquema === 'fijo') lineas.push({ componente: 'fijo', cantidad: 1, unitario: basico, valor: basico });
    lineas.forEach((l) => { const e = equivalencia(l.componente); l.concepto = e ? e.nombre_concepto : ''; l.codigo_concepto = e ? e.codigo_concepto : ''; });
    return { esquema, kg, incluidos, adicionales, precio_kg, basico, valorAdicionales, subtotal, iva_pct: tarifa.iva_pct, iva, total: r2(subtotal + iva), lineas };
  }
  // Frase de la liquidación paso a paso (sirve para cualquier esquema)
  function fraseLiquidacion(f) {
    if (!f) return 'Sin tarifa vigente a la fecha de corte: no se puede liquidar.';
    let paso;
    if (f.esquema === 'solo_kg') paso = `${fmtKg(f.kg)} kg × ${fmtCOP(f.precio_kg)} por kilo = ${fmtCOP(f.subtotal)} (esquema solo por kilo, sin básico)`;
    else if (f.esquema === 'fijo') paso = `cobro fijo mensual ${fmtCOP(f.basico)} (no depende de los ${fmtKg(f.kg)} kg del periodo)`;
    else paso = f.adicionales > 0
      ? `${fmtKg(f.kg)} kg − ${fmtNum(f.incluidos)} kg incluidos = ${fmtKg(f.adicionales)} kg adicionales × ${fmtCOP(f.precio_kg)} = ${fmtCOP(f.valorAdicionales)}; + básico ${fmtCOP(f.basico)} = ${fmtCOP(f.subtotal)}`
      : `${fmtKg(f.kg)} kg no superan los ${fmtNum(f.incluidos)} kg incluidos: 0 kg adicionales; básico ${fmtCOP(f.basico)} = ${fmtCOP(f.subtotal)}`;
    return `${paso}; IVA ${f.iva_pct} % ${fmtCOP(f.iva)}; total ${fmtCOP(f.total)}`;
  }
  // Resumen corto de una tarifa para listas y fichas
  function tarifaResumen(t) {
    if (!t) return 'Sin tarifa';
    const e = t.esquema || 'basico_kg';
    if (e === 'solo_kg') return `Solo por kilo · ${fmtCOP(t.precio_kg)}/kg`;
    if (e === 'fijo') return `Fijo mensual · ${fmtCOP(t.valor_fijo ?? t.basico)}`;
    return `${fmtCOP(t.basico)} · ${fmtNum(t.kg_incluidos)} kg incl. · ${fmtCOP(t.precio_kg)}/kg adic.`;
  }
  function cierreCliente(clienteId, periodoId) {
    const c = cliente(clienteId); const p = byId(periodos, periodoId);
    const t = totalizar(clienteId, periodoId);
    const tarifa = tarifaVigente(c, p.fin);
    return { cliente: c, periodo: p, ...t, tarifa, factura: calcularFactura(tarifa, t.kg) };
  }
  // v6: un cliente creado después del corte no pertenece a ese periodo
  function cierrePeriodo(periodoId) {
    const p = byId(periodos, periodoId);
    return clientes.filter((c) => c.estado === 'activo' && (!c.creado || !p || c.creado <= p.fin)).map((c) => cierreCliente(c.id, periodoId));
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
    return (h1.toString(16).padStart(8, '0') + h2.toString(16).padStart(8, '0') + ((h1 ^ h2) >>> 0).toString(16).padStart(8, '0') + /* v6: >>> 0 evita un «-» en la huella */ ((h1 + h2) >>> 0).toString(16).padStart(8, '0')).slice(0, 32);
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
      facturas.push({ id: 'f-' + (esCofema ? 25756 : n), numero: 'FVE ' + (esCofema ? 25756 : n), cliente: c.id, periodo: p.id, fecha, vence: sumarDias(fecha, plazo), total: f.total, pagada_otro_medio: 0, origen: 'Archivo plano FV · COMSERVA_FV_2026-09_002', archivo: 'ap-fv-2026-09-002', registrada_por: 'Lucrecia', registrada_en: '2026-09-28 09:40' });
      if (!esCofema) n++;
    });
    // Pago por transferencia marcado por Facturación (solo para el saldo de referencia): Visión Sur pagó septiembre.
    const vs = facturas.find((f) => f.cliente === 'c-visionsur' && f.periodo === '2026-09'); if (vs) { vs.pagada_otro_medio = vs.total; vs.pago_otro_medio_nota = 'Transferencia Bancolombia ref. 884120 · 10 oct 2026'; vs.pago_otro_medio_en = '2026-10-10 11:20'; vs.pago_otro_medio_por = 'Lucrecia'; }
  })();
  const factura = (id) => byId(facturas, id);
  const facturaDe = (clienteId, periodoId) => facturas.find((f) => f.cliente === clienteId && f.periodo === periodoId) || null;

  // Recibos: tipo, aplicación a facturas y estados de la v5 (emitido → entregado → exportado → cruzado; anulado)
  (function () {
    const ap = (rid, fid, valor, extra) => { const r = byId(recibos, rid); Object.assign(r, { aplicaciones: [{ factura: fid, valor }], ...extra }); };
    ap('r-35670', 'f-25702', 49980, { tipo: 'pago_factura', estado: 'cruzado', entregado_en: '2026-09-15 07:40', archivo: 'ap-rc-2026-09-001', recibo_helisa: 'RC 8812', recibo_helisa_fecha: '2026-09-29', cruzado_en: '2026-09-29 10:12', conciliado: true });
    ap('r-35671', 'f-25699', 53550, { tipo: 'pago_factura', estado: 'cruzado', entregado_en: '2026-09-19 07:35', archivo: 'ap-rc-2026-09-001', recibo_helisa: 'RC 8813', recibo_helisa_fecha: '2026-09-29', cruzado_en: '2026-09-29 10:12', conciliado: true });
    // Cofema: abono de prueba con el recibo 35672 → archivo RC de septiembre → cruce (RC 8815); saldo de referencia $1.744.935
    ap('r-35672', 'f-25756', 500000, { tipo: 'abono', estado: 'cruzado', entregado_en: '2026-09-28 07:40', archivo: 'ap-rc-2026-09-001', recibo_helisa: 'RC 8815', recibo_helisa_fecha: '2026-09-29', cruzado_en: '2026-09-29 10:12', conciliado: true });
    ap('r-35673', 'f-25710', 47600, { tipo: 'pago_factura', estado: 'cruzado', entregado_en: '2026-09-23 07:30', archivo: 'ap-rc-2026-09-001', recibo_helisa: 'RC 8814', recibo_helisa_fecha: '2026-09-29', cruzado_en: '2026-09-29 10:12', conciliado: true });
    const fpv = facturaDe('c-pielviva', '2026-09'), feco = facturaDe('c-economia', '2026-09'), ftn = facturaDe('c-tinta', '2026-09');
    // v6: Sonrisas pagó en efectivo su factura de septiembre el 1 de octubre; el recibo ya se cruzó en Helisa (cadena completa para la trazabilidad)
    const fson = facturaDe('c-sonrisas', '2026-09');
    const r80 = byId(recibos, 'r-35680'); r80.valor = fson.total; r80.concepto = `Pago de factura ${fson.numero} · septiembre de 2026`;
    ap('r-35680', fson.id, fson.total, { tipo: 'pago_factura', estado: 'cruzado', entregado_en: '2026-10-02 07:40', archivo: 'ap-rc-2026-10-001', recibo_helisa: 'RC 8851', recibo_helisa_fecha: '2026-10-20', cruzado_en: '2026-10-20 09:40', conciliado: true });
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

  // Catálogo de campos exportables (HEL-07)
  const CAMPOS_PLANO = [
    ['plantilla.tipo_documento', 'Tipo de documento de la plantilla', 'FE'], ['plantilla.centro_costo', 'Centro de costo de la plantilla', ''],
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
    { id: 'pl-fv-1', tipo: 'FV', version: 1, nombre: 'Espejo del CSV de Helisa (22 columnas)', estado: 'aprobada', vigente_desde: '2026-09-20', aprobada_por: 'Diego', aprobada_en: '2026-09-20 16:30', creada_por: 'Hernando (equipo)', creada_en: '2026-09-15', nota_cambio: 'Plantilla inicial construida sobre movimiento_contable_ejemplo_otra_empresa.csv. Cuentas definidas por el contador el 19 de septiembre.',
      formato: 'xls', separador: ';', codificacion: 'windows-1252', con_titulos: true, formato_fecha: 'dd/MM/yyyy', decimales: 0, separador_decimal: ',', mayusculas: true, quitar_tildes: true, tipo_documento: 'FE', centro_costo: '', prefijo_doc_fuente: 'FV', nit_con_dv: false, agrupacion: 'periodo', prefijo_archivo: 'COMSERVA', valida_cuadre: true, valida_tercero: true, valida_fve: true,
      columnas: colsHelisa(),
      lineas: [
        { orden: 1, tipo: 'ingreso_basico', clase: 'F', cuenta: '413550', naturaleza: 'C', concepto: 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS {periodo.nombre}', base: false, tercero: true, omitir_cero: false },
        { orden: 2, tipo: 'ingreso_adicionales', clase: 'F', cuenta: '413550', naturaleza: 'C', concepto: 'KILOGRAMOS ADICIONALES {rh.kg_adicionales} KG X {rh.precio_kg}', base: false, tercero: true, omitir_cero: true },
        { orden: 3, tipo: 'iva', clase: 'F', cuenta: '240805', naturaleza: 'C', concepto: 'IVA {rh.iva_pct}%', base: true, tercero: true, omitir_cero: true },
        { orden: 4, tipo: 'cartera', clase: 'F', cuenta: '130505', naturaleza: 'D', concepto: 'FACTURA {documento.doc_fuente} {cliente.razon_social_helisa}', base: false, tercero: true, omitir_cero: false },
      ] },
    { id: 'pl-fv-2', tipo: 'FV', version: 2, nombre: 'Con filas NIIF (clase N) y centro de costo', estado: 'borrador', vigente_desde: '', aprobada_por: '', aprobada_en: '', creada_por: 'Lucrecia', creada_en: '2026-10-15', nota_cambio: 'El contador pide repetir cada línea con clase N y las cuentas NIIF; centro de costo 01 Florencia. Pendiente de probar con Cofema y aprobar.',
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
    { id: 'pl-rc-1', tipo: 'RC', version: 1, nombre: 'Recibo de caja · espejo del CSV de Helisa', estado: 'aprobada', vigente_desde: '2026-09-20', aprobada_por: 'Diego', aprobada_en: '2026-09-20 16:32', creada_por: 'Hernando (equipo)', creada_en: '2026-09-15', nota_cambio: 'DOC FUENTE lleva el número FVE para que Helisa cruce el pago contra la factura.',
      formato: 'xls', separador: ';', codificacion: 'windows-1252', con_titulos: true, formato_fecha: 'dd/MM/yyyy', decimales: 0, separador_decimal: ',', mayusculas: true, quitar_tildes: true, tipo_documento: 'RC', centro_costo: '', prefijo_doc_fuente: 'FVE', nit_con_dv: false, agrupacion: 'periodo', recibos_incluidos: 'entregados', prefijo_archivo: 'COMSERVA', valida_cuadre: true, valida_tercero: true, valida_fve: true,
      columnas: colsHelisa(),
      lineas: [
        { orden: 1, tipo: 'caja', clase: 'F', cuenta: '110505', naturaleza: 'D', concepto: 'RECIBO PROVISIONAL {recibo.numero} {recibo.tipo}', base: false, tercero: true, omitir_cero: false },
        { orden: 2, tipo: 'cartera', clase: 'F', cuenta: '130505', naturaleza: 'C', concepto: 'ABONO A {aplicacion.factura_numero}', base: false, tercero: true, omitir_cero: false },
      ] },
    { id: 'pl-ter-1', tipo: 'TER', version: 1, nombre: 'Cartilla de terceros (por definir)', estado: 'borrador', vigente_desde: '', aprobada_por: '', aprobada_en: '', creada_por: 'Hernando (equipo)', creada_en: '2026-10-18', nota_cambio: 'Pendiente: títulos de la cartilla de terceros de Helisa.',
      formato: 'xls', separador: ';', codificacion: 'windows-1252', con_titulos: true, formato_fecha: 'dd/MM/yyyy', decimales: 0, separador_decimal: ',', mayusculas: true, quitar_tildes: true, tipo_documento: '', centro_costo: '', prefijo_doc_fuente: '', nit_con_dv: true, agrupacion: 'lote', prefijo_archivo: 'COMSERVA', valida_cuadre: false, valida_tercero: false, valida_fve: false,
      columnas: [['IDENTIDAD', 'campo', 'cliente.nit'], ['DV', 'campo', 'cliente.dv'], ['CLASE DOC', 'constante', '', 'NIT'], ['NOMBRE', 'campo', 'cliente.razon_social_helisa'], ['NATURALEZA', 'constante', '', 'JURIDICA'], ['DIRECCION', 'campo', 'cliente.direccion'], ['TELEFONO', 'campo', 'cliente.telefono'], ['CIUDAD', 'campo', 'cliente.ciudad'], ['CORREO', 'campo', 'cliente.email']].map(([titulo, origen, campo, constante], i) => ({ orden: i + 1, titulo, origen, campo, constante: constante || '' })),
      lineas: [] },
  ];
  const plantillaVigente = (tipo) => plantillas_plano.filter((p) => p.tipo === tipo && p.estado === 'aprobada' && p.vigente_desde <= HOY).sort((a, b) => b.vigente_desde.localeCompare(a.vigente_desde))[0] || null;

  // Archivos planos generados
  const archivos_plano = [
    { id: 'ap-fv-2026-09-001', tipo: 'FV', periodo: '2026-09', plantilla: 'pl-fv-1', consecutivo: 1, nombre: 'COMSERVA_FV_2026-09_001.xls', estado: 'rechazado', generado_por: 'Lucrecia', generado_en: '2026-09-26 17:50', descargado_en: '2026-09-26 17:51', rechazado_en: '2026-09-27 08:20', errores: 'Fila 5: el tercero 900555017 no existe en la cartilla de terceros.\nFila 29: el tercero 1000000340 no existe en la cartilla de terceros.', documentos: 12, filas: 46, debitos: 1180452, creditos: 1180452, sha256: '' },
    { id: 'ap-fv-2026-09-002', tipo: 'FV', periodo: '2026-09', plantilla: 'pl-fv-1', consecutivo: 2, nombre: 'COMSERVA_FV_2026-09_002.xls', estado: 'importado', generado_por: 'Lucrecia', generado_en: '2026-09-27 09:05', descargado_en: '2026-09-27 09:06', importado_en: '2026-09-27 09:40', importado_por: 'Lucrecia', documentos: 12, filas: 46, debitos: 1180452, creditos: 1180452, sha256: '', nota: 'Terceros creados en Helisa a mano el 27 de septiembre (Droguería El Trébol). 12 facturas generadas: FVE 25756 a 25767.' },
    { id: 'ap-rc-2026-09-001', tipo: 'RC', periodo: '2026-09', plantilla: 'pl-rc-1', consecutivo: 1, nombre: 'COMSERVA_RC_2026-09_001.xls', estado: 'importado', generado_por: 'Lucrecia', generado_en: '2026-09-29 09:50', descargado_en: '2026-09-29 09:51', importado_en: '2026-09-29 10:10', importado_por: 'Lucrecia', documentos: 4, filas: 8, debitos: 651130, creditos: 651130, sha256: '', nota: 'Recibos definitivos RC 8812 a 8815 (la 8815 es el abono de prueba de Cofema a la FVE 25756); cruce automático por DOC FUENTE.' },
  ];
  // v6: archivo RC de octubre con el recibo 35680 (Sonrisas), importado y cruzado
  archivos_plano.push({ id: 'ap-rc-2026-10-001', tipo: 'RC', periodo: '2026-10', plantilla: 'pl-rc-1', consecutivo: 1, nombre: 'COMSERVA_RC_2026-10_001.xls', estado: 'importado', generado_por: 'Lucrecia', generado_en: '2026-10-20 09:15', descargado_en: '2026-10-20 09:16', importado_en: '2026-10-20 09:38', importado_por: 'Lucrecia', documentos: 1, filas: 2, debitos: 0, creditos: 0, sha256: '', nota: 'Recibo definitivo RC 8851; cruce automático con la factura de septiembre de Sonrisas del Caquetá.' });
  (function () { const a = archivos_plano[archivos_plano.length - 1]; a.debitos = a.creditos = facturaDe('c-sonrisas', '2026-09').total; })();
  archivos_plano.forEach((a) => { a.sha256 = hashFake(a.nombre + a.generado_en); });

  // =====================================================================
  // v6 · Cierres por cliente (anticipados desde el día 20), pedidos para Helisa y registro de la FVE
  // ---------------------------------------------------------------------
  // cierres_cliente: clientes que se cerraron antes del cierre general del periodo. El resto se cierra con el periodo.
  // Cofema (sep.) se cerró el 22 de septiembre: por eso su FVE 25756 es del 23, antes del corte del 26.
  const cierres_cliente = [
    { cliente: 'c-cofema', periodo: '2026-09', cerrado_en: '2026-09-22 15:20', cerrado_por: 'Lucrecia', rh: '22690-26', anticipado: true },
    { cliente: 'c-prueba-fijo', periodo: '2026-10', cerrado_en: '2026-10-20 10:30', cerrado_por: 'Lucrecia', rh: '22702-26', anticipado: true },
    { cliente: 'c-prueba-kg', periodo: '2026-10', cerrado_en: '2026-10-21 16:05', cerrado_por: 'Lucrecia', rh: '22703-26', anticipado: true },
    // P1: dos clientes mensuales que ya tuvieron su visita de octubre se cierran hoy; quedan «cerrados» sin pedido para la demostración
    { cliente: 'c-sonrisas', periodo: '2026-10', cerrado_en: '2026-10-22 08:15', cerrado_por: 'Lucrecia', rh: '22704-26', anticipado: true },
    { cliente: 'c-ramirez', periodo: '2026-10', cerrado_en: '2026-10-22 08:20', cerrado_por: 'Lucrecia', rh: '22705-26', anticipado: true },
  ];
  // Las visitas transmitidas de un cliente con cierre anticipado ya cuentan en su cierre (como las de un periodo cerrado)
  cierres_cliente.forEach((cc) => visitas.forEach((v) => { if (v.cliente === cc.cliente && v.periodo === cc.periodo && v.estado === 'transmitida') v.estado = 'en_cierre'; }));
  const cierreAnticipado = (clienteId, periodoId) => cierres_cliente.find((x) => x.cliente === clienteId && x.periodo === periodoId) || null;
  // Número de la planilla RH de un cliente-periodo: el del cierre anticipado o base del periodo + posición del cliente (como en la v5)
  function numeroRH(clienteId, periodoId) {
    const pre = cierreAnticipado(clienteId, periodoId); if (pre) return pre.rh;
    const p = byId(periodos, periodoId); if (!p || p.estado !== 'cerrado' || p.planilla_base == null) return null;
    const idx = cierrePeriodo(periodoId).findIndex((r) => r.cliente.id === clienteId);
    return idx < 0 ? null : consecutivoPlanilla(p.planilla_base + idx, p.fin);
  }
  // Fecha y usuario del cierre de un cliente (anticipado o con el periodo)
  function cierreDe(clienteId, periodoId) {
    const pre = cierreAnticipado(clienteId, periodoId); if (pre) return pre;
    const p = byId(periodos, periodoId); if (!p || p.estado !== 'cerrado') return null;
    return { cliente: clienteId, periodo: periodoId, cerrado_en: p.cerrado_en, cerrado_por: p.cerrado_por, rh: numeroRH(clienteId, periodoId), anticipado: false };
  }

  // Pedidos para Helisa (PROPUESTA 1 · modalidad 1A archivo plano; 1B Conekta usa via: 'conekta' y envio).
  // Un pedido por cliente (o código de cliente en Helisa) y periodo. Los números OP son de prueba (Helisa de Comserva aún no tiene Pedido habilitado).
  const ESTADO_PEDIDO_LABEL = { generado: 'Generado', descargado: 'Descargado', enviado: 'Enviado por API', importado: 'Importado en Helisa', facturado: 'Facturado (FVE registrada)', rechazado: 'Rechazado por Helisa', anulado: 'Anulado' };
  const archivos_op = [
    { id: 'ap-op-2026-09-001', periodo: '2026-09', nombre: 'COMSERVA_OP_2026-09_001.txt', estado: 'importado', generado_en: '2026-09-22 15:32', generado_por: 'Lucrecia', descargado_en: '2026-09-22 15:33', importado_en: '2026-09-23 08:10', importado_por: 'Lucrecia', pedidos: 1, nota: 'Cierre anticipado de Cofema.' },
    { id: 'ap-op-2026-09-002', periodo: '2026-09', nombre: 'COMSERVA_OP_2026-09_002.txt', estado: 'rechazado', generado_en: '2026-09-26 17:50', generado_por: 'Lucrecia', descargado_en: '2026-09-26 17:51', rechazado_en: '2026-09-27 08:20', pedidos: 11, errores: 'Línea 1: el código de cliente de Droguería El Trébol no existe en Helisa. Se creó el cliente en Helisa y se regeneró el archivo.' },
    { id: 'ap-op-2026-09-003', periodo: '2026-09', nombre: 'COMSERVA_OP_2026-09_003.txt', estado: 'importado', generado_en: '2026-09-27 09:05', generado_por: 'Lucrecia', descargado_en: '2026-09-27 09:06', importado_en: '2026-09-27 09:40', importado_por: 'Lucrecia', pedidos: 11 },
    { id: 'ap-op-2026-10-001', periodo: '2026-10', nombre: 'COMSERVA_OP_2026-10_001.txt', estado: 'importado', generado_en: '2026-10-20 10:35', generado_por: 'Lucrecia', descargado_en: '2026-10-20 10:36', importado_en: '2026-10-20 11:02', importado_por: 'Lucrecia', pedidos: 1, nota: 'Cierre anticipado del Consultorio de Prueba.' },
    { id: 'ap-op-2026-10-002', periodo: '2026-10', nombre: 'COMSERVA_OP_2026-10_002.txt', estado: 'descargado', generado_en: '2026-10-21 16:12', generado_por: 'Lucrecia', descargado_en: '2026-10-21 16:13', pedidos: 1, nota: 'Cierre anticipado del Centro Clínico de Prueba. Falta importarlo en Helisa.' },
  ];
  archivos_op.forEach((a) => { a.via = 'archivo'; a.sha256 = hashFake(a.nombre + a.generado_en); });
  const pedidos = [];
  (function () {
    let n = 101;
    const add = (clienteId, periodoId, archivo, extra = {}) => {
      const cz = cierreCliente(clienteId, periodoId); if (!cz.factura) return;
      const a = archivos_op.find((x) => x.id === archivo);
      const ped = { id: 'op-' + n, numero: 'OP ' + n, cliente: clienteId, periodo: periodoId, rh: numeroRH(clienteId, periodoId), archivo, via: 'archivo', fecha: a.generado_en.slice(0, 10), lineas: cz.factura.lineas.length + 1, subtotal: cz.factura.subtotal, estado: a.estado === 'importado' ? 'importado' : a.estado, generado_en: a.generado_en, generado_por: a.generado_por, importado_en: a.importado_en || null, historial: [], ...extra };
      pedidos.push(ped); n++;
      return ped;
    };
    add('c-cofema', '2026-09', 'ap-op-2026-09-001');
    cierrePeriodo('2026-09').filter((r) => r.cliente.id !== 'c-cofema' && r.factura).forEach((r) => {
      add(r.cliente.id, '2026-09', 'ap-op-2026-09-003', { historial: [{ archivo: 'ap-op-2026-09-002', estado: 'rechazado', en: '2026-09-27 08:20', propio: r.cliente.id === 'c-trebol', detalle: r.cliente.id === 'c-trebol' ? 'el código de cliente no existía en Helisa' : 'el archivo completo se rechazó por un error en otro cliente' }] });
    });
    add('c-prueba-fijo', '2026-10', 'ap-op-2026-10-001');
    add('c-prueba-kg', '2026-10', 'ap-op-2026-10-002');
  })();
  const pedidoDe = (clienteId, periodoId) => pedidos.filter((x) => x.cliente === clienteId && x.periodo === periodoId && x.estado !== 'anulado').pop() || null;

  // Registro de la FVE (P1): vía 'listado' (exportación de facturas de Helisa, formato por confirmar), 'digitada' (en el panel) o 'conekta' (lectura por API, 1B).
  // Se valida contra el total del RH con tolerancia de $1. El CUFE se guarda «si se tiene»; los de los mockups son DE PRUEBA.
  const cufePrueba = (seed) => (hashFake(seed + '|a') + hashFake(seed + '|b') + hashFake(seed + '|c')).slice(0, 96);
  facturas.forEach((f) => {
    if (f.periodo !== '2026-09') return;
    f.pedido = (pedidos.find((x) => x.cliente === f.cliente && x.periodo === f.periodo) || {}).numero || null;
    f.via_registro = 'listado';
    f.cufe = cufePrueba(f.numero); f.cufe_prueba = true;
    if (f.cliente === 'c-cofema') { f.registrada_en = '2026-09-23 16:40'; f.via_registro = 'digitada'; f.origen = 'Elaborada en Helisa llamando el pedido OP 101 (F3)'; }
    else f.origen = 'Elaborada en Helisa llamando el pedido ' + f.pedido + ' (F3)';
  });
  pedidos.forEach((ped) => { if (facturaDe(ped.cliente, ped.periodo)) ped.estado = 'facturado'; });
  const VIA_REGISTRO_LABEL = { listado: 'Listado de facturas exportado de Helisa', digitada: 'Digitada en el panel', conekta: 'Leída por Helisa Conekta (API)', sistema: 'Emitida por el sistema' };
  function validacionFVE(f) {
    if (!f) return null;
    const cz = cierreCliente(f.cliente, f.periodo); const rh = cz.factura ? cz.factura.total : null;
    if (rh == null) return { ok: false, diferencia: null, rh };
    const diferencia = r2(f.total - rh);
    return { ok: Math.abs(diferencia) <= 1, diferencia, rh };
  }

  // Facturas de referencia para probar la liquidación y el redondeo (CIE-03)
  const facturas_referencia = [
    { numero: 'FVE 25756', fecha: '2026-09-23', cliente: 'c-cofema', periodo: '2026-09', esquema: 'basico_kg', kg: 413.85, subtotal: 1886500, iva: 358435, total: 2244935, nota: 'Factura real de Cofema (septiembre de 2026).' },
    { numero: 'FVE 25997', fecha: '2026-10-21', cliente: 'c-prueba-kg', periodo: '2026-10', esquema: 'solo_kg', kg: 108.5, precio_kg: 3991.6, subtotal: 433088.6, iva: 82286.83, total: 515375.43, nota: 'Cifras reales vistas el 21 de octubre; en los mockups se aplican a un cliente ficticio.' },
  ];
  function pruebaReferencia(ref) {
    const t = ref.esquema === 'solo_kg' ? { esquema: 'solo_kg', precio_kg: ref.precio_kg, iva_pct: 19 } : tarifaVigente(cliente(ref.cliente), byId(periodos, ref.periodo).fin);
    const f = calcularFactura(t, ref.kg);
    return { ref, f, ok: !!f && Math.abs(f.total - ref.total) < 0.005 };
  }

  // Estado del cierre de un cliente: abierto → cerrado → exportado (pedido generado) → facturado (FVE registrada)
  function estadoCierre(clienteId, periodoId) {
    const p = byId(periodos, periodoId); if (!p) return 'abierto';
    if (p.estado === 'abierto' && !cierreAnticipado(clienteId, periodoId)) return 'abierto';
    if (facturaDe(clienteId, periodoId)) return 'facturado';
    const ped = pedidoDe(clienteId, periodoId); if (ped && ped.estado !== 'rechazado') return 'exportado';
    if (archivos_plano.some((a) => a.tipo === 'FV' && a.periodo === periodoId && a.estado !== 'anulado' && a.estado !== 'rechazado')) return 'exportado';
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
    if (pl.tipo === 'FV') (docs.cierres || []).forEach((cz) => {
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

  // =====================================================================
  // v6 · TRAZABILIDAD (TRZ-01 a TRZ-06) · módulo genérico
  // ---------------------------------------------------------------------
  // La página panel/trazabilidad.html no conoce ninguna propuesta: dibuja lo que devuelve DATA.traza.
  //   traza.tipos         catálogo de eslabones (etiqueta, icono, grupo, texto cuando falta)
  //   traza.flujos        orden de los eslabones por propuesta; traza.propuesta elige cuál se usa ('P1' en la base)
  //   traza.columnas      columnas de la matriz del periodo por propuesta (cada columna agrupa uno o más tipos)
  //   traza.filtros       fichas de filtro de la matriz
  //   traza.constructores funciones que arman cada eslabón desde los datos de la base (visitas, cierres, pedidos, FVE, recibos…)
  //   traza.registros     eslabones declarados como DATOS: { tipo, cliente, periodo, estado, numero, sub, fecha, usuario, hash, cufe, docs, detalle, eventos }
  //                       Un registro reemplaza (campo a campo) lo que arme el constructor; si no hay constructor, el registro es el eslabón.
  //   traza.cadena(c, p)  cadena documental de un cliente-periodo · traza.matriz(p) · traza.buscar(q) · traza.expediente(c, p)
  // Estados de un eslabón: ok (completo) · curso (en curso) · pendiente (falta) · alerta (rechazo, anulación o diferencia) · na (no aplica)
  // =====================================================================
  const traza = (function () {
    const ESTADO = { ok: 'Completo', curso: 'En curso', pendiente: 'Pendiente', alerta: 'Con alerta', na: 'No aplica' };
    const tipos = {
      visitas: { etiqueta: 'Visitas y constancias', corto: 'Visitas', icono: 'visita', grupo: 'Campo', falta: 'Sin visitas válidas en el periodo' },
      cierre: { etiqueta: 'Cierre del cliente', corto: 'Cierre', icono: 'cierre', grupo: 'Oficina', falta: 'Periodo abierto: el cliente se puede cerrar desde el día 20' },
      rh: { etiqueta: 'Planilla RH', corto: 'RH', icono: 'planilla', grupo: 'Oficina', falta: 'La planilla se numera al cerrar' },
      pedido: { etiqueta: 'Pedido para Helisa', corto: 'Pedido', icono: 'pedido', grupo: 'Helisa', falta: 'Falta generar el pedido (archivo OP o envío por Conekta)', propuesta: 'P1' },
      fve: { etiqueta: 'FVE registrada', corto: 'FVE', icono: 'factura', grupo: 'Helisa', falta: 'Falta registrar la FVE', propuesta: 'P1' },
      recibos: { etiqueta: 'Recibos de caja', corto: 'Recibos', icono: 'recibo', grupo: 'Recaudo', falta: 'El recibo se habilita con la factura registrada' },
      rc: { etiqueta: 'Movimiento contable del recibo', corto: 'Archivo RC', icono: 'archivo', grupo: 'Helisa', falta: 'Sin recibos por exportar' },
      cruce: { etiqueta: 'Cruce en Helisa', corto: 'Cruce', icono: 'cruce', grupo: 'Helisa', falta: 'Falta el cruce del pago con la factura' },
      // Tipos de la propuesta 2: definidos aquí para que la P2 solo agregue datos (traza.registros) o constructores
      prefactura: { etiqueta: 'Prefactura (borrador)', corto: 'Prefactura', icono: 'prefactura', grupo: 'Oficina', falta: 'Falta generar la prefactura', propuesta: 'P2' },
      fe: { etiqueta: 'Factura electrónica', corto: 'FE', icono: 'factura', grupo: 'DIAN', falta: 'Falta emitir la factura electrónica', propuesta: 'P2' },
      dian: { etiqueta: 'Validación DIAN', corto: 'DIAN', icono: 'dian', grupo: 'DIAN', falta: 'Sin respuesta de la DIAN', propuesta: 'P2' },
      envio: { etiqueta: 'Envío al cliente y eventos RADIAN', corto: 'Envío', icono: 'correo', grupo: 'DIAN', falta: 'Falta enviar la factura al cliente', propuesta: 'P2' },
      nota: { etiqueta: 'Notas crédito o débito', corto: 'Notas', icono: 'nota', grupo: 'DIAN', falta: 'Sin notas', propuesta: 'P2' },
      asiento: { etiqueta: 'Asiento contable a Helisa', corto: 'Asiento', icono: 'asiento', grupo: 'Helisa', falta: 'Falta enviar la contabilización de la factura', propuesta: 'P2' },
    };
    const flujos = {
      P1: ['visitas', 'cierre', 'rh', 'pedido', 'fve', 'recibos', 'rc', 'cruce'],
      P2: ['visitas', 'cierre', 'rh', 'prefactura', 'fe', 'envio', 'asiento', 'recibos', 'rc', 'cruce'],
    };
    const columnas = {
      P1: [
        { clave: 'visitas', etiqueta: 'Visitas', tipos: ['visitas'] }, { clave: 'cierre', etiqueta: 'Cierre', tipos: ['cierre'] }, { clave: 'rh', etiqueta: 'RH', tipos: ['rh'] },
        { clave: 'pedido', etiqueta: 'Pedido', tipos: ['pedido'] }, { clave: 'fve', etiqueta: 'FVE', tipos: ['fve'] }, { clave: 'recibos', etiqueta: 'Recibos', tipos: ['recibos'] }, { clave: 'cruce', etiqueta: 'Cruce', tipos: ['rc', 'cruce'] },
      ],
      P2: [
        { clave: 'visitas', etiqueta: 'Visitas', tipos: ['visitas'] }, { clave: 'cierre', etiqueta: 'Cierre', tipos: ['cierre'] }, { clave: 'rh', etiqueta: 'RH', tipos: ['rh'] },
        { clave: 'fe', etiqueta: 'Factura electrónica', tipos: ['prefactura', 'fe'] }, { clave: 'dian', etiqueta: 'DIAN y envío', tipos: ['envio'] }, { clave: 'recibos', etiqueta: 'Recibos', tipos: ['recibos'] }, { clave: 'cruce', etiqueta: 'Cruce', tipos: ['asiento', 'rc', 'cruce'] },
      ],
    };
    // Tipo que representa «la factura» en cada flujo (para el filtro «sin factura»)
    const tipo_factura = { P1: 'fve', P2: 'fe' };
    const filtros = [
      { clave: 'todos', etiqueta: 'Todos', test: () => true },
      { clave: 'sin_factura', etiqueta: 'Sin FVE', test: (f) => f.cerrado && !['ok', 'na'].includes((f.cadena.eslabones.find((e) => e.tipo === tipo_factura[api.propuesta]) || {}).estado) },
      { clave: 'con_saldo', etiqueta: 'Con saldo', test: (f) => f.cadena.saldo > 0 },
      { clave: 'rechazados', etiqueta: 'Rechazados o anulados', test: (f) => f.cadena.alertas > 0 },
      { clave: 'pendientes', etiqueta: 'Con pendientes', test: (f) => f.cadena.completos < f.cadena.total },
      { clave: 'completos', etiqueta: 'Cadena completa', test: (f) => f.cadena.completos === f.cadena.total },
    ];
    const textos = {
      intro: 'Siga cada servicio desde la visita en campo hasta el cruce del pago en Helisa. Cada eslabón guarda estado, fecha y hora, usuario, documento y huella (hash); lo que falta se ve punteado.',
      modalidad: 'Propuesta 1 · modalidad 1A (archivos planos). Con la modalidad 1B (Helisa Conekta) el pedido y el recibo se envían por API y la FVE se lee sola.',
    };

    const nombreCorto = (n) => String(n || '').split(' ').slice(0, 2).join(' ');
    const fh = (s) => (s ? s.slice(0, 16) : '');
    const nh = (v) => v.hora_servidor || v.hora;

    // --- contexto de un cliente-periodo -------------------------------------------------
    function contexto(clienteId, periodoId) {
      const c = cliente(clienteId), p = byId(periodos, periodoId);
      const cz = cierreCliente(clienteId, periodoId);
      const f = facturaDe(clienteId, periodoId);
      const rs = f ? recibos.filter((r) => (r.aplicaciones || []).some((a) => a.factura === f.id)) : [];
      return { c, p, cz, cierre: cierreDe(clienteId, periodoId), pedido: pedidoDe(clienteId, periodoId), factura: f, recibos: rs, validos: rs.filter((r) => r.estado !== 'anulado'), saldo: f ? saldoReferencia(f.id) : 0, eslabon: {} };
    }

    // --- constructores de la base (propuesta 1 · 1A) ---------------------------------------
    const constructores = {
      visitas(x) {
        const todas = visitas.filter((v) => v.cliente === x.c.id && v.periodo === x.p.id);
        if (!todas.length) return null;
        const validas = todas.filter((v) => v.tipo === 'recoleccion' && ['transmitida', 'en_cierre'].includes(v.estado));
        const fallidas = todas.filter((v) => v.tipo === 'fallida');
        const anuladas = todas.filter((v) => v.estado === 'anulada'), rechazadas = todas.filter((v) => v.estado === 'rechazada');
        const enCelular = todas.filter((v) => v.estado === 'cerrada'), borradores = todas.filter((v) => v.estado === 'borrador');
        const kg = r2(validas.reduce((a, v) => a + totalKg(v), 0));
        const ult = validas.slice().sort((a, b) => (a.fecha + nh(a)).localeCompare(b.fecha + nh(b))).pop();
        const estado = !validas.length ? (rechazadas.length ? 'alerta' : 'curso') : (enCelular.length || borradores.length ? 'curso' : 'ok');
        const avisos = [];
        if (anuladas.length) avisos.push(`${anuladas.length} anulada${anuladas.length > 1 ? 's' : ''} con reemplazo`);
        if (rechazadas.length) avisos.push(`${rechazadas.length} rechazada${rechazadas.length > 1 ? 's' : ''} por el servidor`);
        if (enCelular.length) avisos.push(`${enCelular.length} guardada${enCelular.length > 1 ? 's' : ''} en un celular sin transmitir`);
        if (borradores.length) avisos.push(`${borradores.length} en borrador`);
        if (fallidas.length) avisos.push(`${fallidas.length} fallida${fallidas.length > 1 ? 's' : ''} con evidencia`);
        const eventos = [];
        todas.forEach((v) => {
          const n = v.consecutivo ? `constancia ${v.consecutivo}` : 'visita sin número';
          if (v.estado === 'borrador') eventos.push({ en: `${v.fecha} ${v.hora}`, quien: nombreCorto(operario(v.operario).nombre), accion: 'Abrió una visita en el celular (borrador)', nivel: 'curso' });
          else if (v.estado === 'cerrada') eventos.push({ en: v.pendiente_desde || `${v.fecha} ${v.hora}`, quien: nombreCorto(operario(v.operario).nombre), accion: `Cerró la ${n} en el celular, sin señal`, detalle: `${v.intentos || 0} intentos de envío`, nivel: 'curso' });
          else if (v.tipo === 'fallida') eventos.push({ en: `${v.fecha} ${nh(v)}`, quien: nombreCorto(operario(v.operario).nombre), accion: `Visita fallida (${n})`, detalle: v.motivo_fallida, nivel: 'curso' });
          else eventos.push({ en: `${v.fecha} ${nh(v)}`, quien: 'Servidor', accion: `Recibió la ${n} · ${fmtKg(totalKg(v))} kg`, detalle: `Operario ${nombreCorto(operario(v.operario).nombre)} · ${v.placa}`, nivel: v.estado === 'rechazada' ? 'alerta' : 'ok' });
          if (v.estado === 'rechazada') eventos.push({ en: `${v.fecha} ${nh(v)}`, quien: 'Servidor', accion: `Rechazó la ${n}`, detalle: v.rechazo, nivel: 'alerta' });
          if (v.estado === 'anulada') eventos.push({ en: v.anulada_en, quien: nombreCorto(v.anulada_por), accion: `Anuló la ${n}`, detalle: v.anulacion_motivo, nivel: 'alerta' });
        });
        const manual = (validas.find((v) => v.planilla) || {}).planilla;
        return {
          estado, alerta: anuladas.length + rechazadas.length > 0,
          numero: validas.length ? `${validas.length} constancia${validas.length === 1 ? '' : 's'}` : 'Sin constancias válidas',
          sub: validas.length ? `${fmtKg(kg)} kg${fallidas.length ? ` · ${fallidas.length} fallida` : ''}` : avisos.join(' · '),
          aviso: avisos.join(' · '),
          fecha: ult ? `${ult.fecha} ${nh(ult)}` : '', usuario: [...new Set(validas.map((v) => nombreCorto(operario(v.operario).nombre)))].join(', '),
          hash: validas.length ? hashFake('visitas|' + validas.map((v) => v.id).join('|')) : '',
          docs: todas.filter((v) => v.consecutivo && v.estado !== 'cerrada').sort((a, b) => a.consecutivo - b.consecutivo).map((v) => ({ nombre: `Constancia de visita N.º ${v.consecutivo}`, numero: String(v.consecutivo), fecha: `${v.fecha} ${v.hora}`, hash: hashFake(v.id), href: `../documentos/constancia.html#${v.id}`, estado: v.estado, nota: v.tipo === 'fallida' ? 'Visita fallida' : (v.estado === 'anulada' ? 'Anulada' : (v.estado === 'rechazada' ? 'Rechazada' : `${fmtKg(totalKg(v))} kg`)) })),
          detalle: [['Visitas válidas', String(validas.length)], ['Kilos', `${fmtKg(kg)} kg`], ...(avisos.length ? [['Novedades', avisos.join(' · ')]] : []), ...(manual ? [['Planilla en papel', `Equivale a la planilla manual N.º ${manual}`]] : [])],
          enlace: { href: `visitas.html#cliente=${x.c.id}`, texto: 'Ver en la bandeja de visitas' },
          eventos,
        };
      },
      cierre(x) {
        const ci = x.cierre; const f = x.cz.factura;
        if (!ci) return { estado: 'pendiente', numero: 'Abierto', sub: x.p.cierre_desde ? `Se puede cerrar desde el ${fmtFechaCorta(x.p.cierre_desde)} · corte el ${fmtFechaCorta(x.p.fin)}` : 'Periodo abierto' };
        return {
          estado: 'ok', numero: ci.anticipado ? 'Cierre anticipado' : 'Cierre del periodo', sub: `${fmtKg(x.cz.kg)} kg · ${f ? fmtCOP(f.total) : 'sin tarifa'}`,
          fecha: ci.cerrado_en, usuario: nombreCorto(ci.cerrado_por), hash: hashFake(`cierre|${x.c.id}|${x.p.id}`),
          docs: [{ nombre: `Liquidación del cierre · ${x.p.nombre}`, numero: '', fecha: ci.cerrado_en, hash: hashFake(`cierre|${x.c.id}|${x.p.id}`), href: `cierre.html#${x.p.id}|${x.c.id}` }],
          detalle: [['Tarifa', tarifaResumen(x.cz.tarifa)], ['Liquidación', fraseLiquidacion(f)], ['Tipo de cierre', ci.anticipado ? `Anticipado (desde el día ${parametros.dia_inicio_cierre})` : 'Con el corte del periodo'], ['Versión', '1']],
          enlace: { href: `cierre.html#${x.p.id}|${x.c.id}`, texto: 'Ver la liquidación' },
          eventos: [{ en: ci.cerrado_en, quien: nombreCorto(ci.cerrado_por), accion: ci.anticipado ? 'Cerró el cliente (cierre anticipado)' : 'Cerró el periodo', detalle: `${fmtKg(x.cz.kg)} kg · ${f ? fmtCOP(f.total) : ''}`, nivel: 'ok' }],
        };
      },
      rh(x) {
        const num = numeroRH(x.c.id, x.p.id); if (!num) return null;
        const f = x.cz.factura, ci = x.cierre, h = hashFake(`planilla|${x.c.id}|${x.p.id}`);
        const cats = Object.entries(x.cz.porCat).filter(([, kg]) => kg > 0).map(([k, kg]) => `${k} ${fmtKg(kg)}`).join(' · ');
        return {
          estado: 'ok', numero: num, sub: `${f ? fmtCOP(f.total) : ''} · ${ESQUEMA_TARIFA_CORTO[f ? f.esquema : 'basico_kg']}`,
          fecha: ci ? ci.cerrado_en : '', usuario: ci ? nombreCorto(ci.cerrado_por) : '', hash: h, valor: f ? f.total : 0,
          docs: [{ nombre: `Planilla mensual RHPS ${num}`, numero: num, fecha: ci ? ci.cerrado_en : '', hash: h, href: `../documentos/planilla.html#${x.c.id}|${x.p.id}` }],
          detalle: [['Kilos por categoría', cats || '—'], ['Subtotal', f ? fmtCOP(f.subtotal) : '—'], [`IVA ${f ? f.iva_pct : ''} %`, f ? fmtCOP(f.iva) : '—'], ['Total', f ? fmtCOP(f.total) : '—']],
          enlace: { href: `../documentos/planilla.html#${x.c.id}|${x.p.id}`, texto: 'Abrir la planilla' },
          eventos: [{ en: ci ? ci.cerrado_en : '', quien: 'Sistema', accion: `Generó la planilla RH ${num}`, detalle: f ? `${fmtCOP(f.total)} · ${ESQUEMA_TARIFA_LABEL[f.esquema].toLowerCase()}` : '', nivel: 'ok' }],
        };
      },
      pedido(x) {
        const ped = x.pedido; if (!ped) return null;
        const a = archivos_op.find((y) => y.id === ped.archivo) || {};
        const estado = ['importado', 'facturado', 'enviado'].includes(ped.estado) ? 'ok' : (ped.estado === 'rechazado' ? 'alerta' : 'curso');
        const rech = (ped.historial || []).filter((hh) => hh.estado === 'rechazado');
        const lineas = x.cz.factura ? x.cz.factura.lineas.map((l) => `${l.concepto} (${fmtKg(l.cantidad)} × ${fmtCOP(l.unitario)})`).join(' + ') + ' + comentario del mes' : '';
        const eventos = [];
        rech.forEach((hh) => { const ar = archivos_op.find((y) => y.id === hh.archivo) || {}; eventos.push({ en: ar.generado_en, quien: nombreCorto(ar.generado_por), accion: `Generó el archivo de pedidos ${ar.nombre}`, nivel: 'ok' }, { en: hh.en, quien: nombreCorto(ar.generado_por), accion: `Helisa rechazó el archivo ${ar.nombre}`, detalle: hh.detalle, nivel: 'alerta' }); });
        eventos.push({ en: a.generado_en, quien: nombreCorto(a.generado_por), accion: `Generó el pedido ${ped.numero} (archivo ${a.nombre})`, nivel: 'ok' });
        if (a.importado_en) eventos.push({ en: a.importado_en, quien: nombreCorto(a.importado_por), accion: `Marcó importado en Helisa el archivo ${a.nombre}`, nivel: 'ok' });
        return {
          estado, alerta: rech.some((hh) => hh.propio), numero: ped.numero,
          sub: ped.via === 'conekta' ? 'Enviado por Helisa Conekta' : (estado === 'ok' ? 'Importado en Helisa' : (ESTADO_PEDIDO_LABEL[ped.estado] + ' · falta importarlo en Helisa')),
          aviso: rech.length ? `El archivo ${(archivos_op.find((y) => y.id === rech[0].archivo) || {}).nombre} fue rechazado: ${rech[0].detalle}. Se regeneró.` : '',
          nivel_aviso: rech.some((hh) => hh.propio) ? 'alerta' : 'info',
          fecha: a.importado_en || a.generado_en, usuario: nombreCorto(a.importado_por || a.generado_por), hash: a.sha256,
          docs: [{ nombre: `Archivo de pedidos ${a.nombre}`, numero: ped.numero, fecha: a.generado_en, hash: a.sha256, href: 'planos.html' }],
          detalle: [['Modalidad', ped.via === 'conekta' ? '1B · Helisa Conekta (API)' : '1A · archivo plano (pedido OP de 24 columnas con títulos, .xlsx; Excel de Julio, 23 oct)'], ['Líneas', lineas], ['Subtotal del pedido', fmtCOP(ped.subtotal)], ['Código del cliente en Helisa', `${x.c.helisa.codigo_cliente || 'falta'} (${x.c.helisa.codigo_estado})`], ['Lista de precio del cliente', `${x.c.helisa.lista_precio || '—'} · ${(listaPrecio(x.c.helisa.lista_precio) || {}).nombre || 'falta'} (por confirmar con Julio)`], ['Centro de costo · negocio · vendedor', `${helisa.centro_costo.codigo} · vacío · ${helisa.vendedor.identidad} (${helisa.fuente})`]],
          enlace: { href: 'planos.html', texto: 'Ver archivos para Helisa' },
          buscar: [a.nombre, ...rech.map((hh) => (archivos_op.find((y) => y.id === hh.archivo) || {}).nombre)],
          eventos,
        };
      },
      fve(x) {
        const f = x.factura;
        if (!f) return x.pedido && x.pedido.estado === 'importado' ? { estado: 'pendiente', numero: 'Sin FVE', sub: 'Falta registrar la FVE: se elabora en Helisa llamando el pedido (F3)' } : null;
        const val = validacionFVE(f);
        return {
          estado: val.ok ? 'ok' : 'alerta', alerta: !val.ok, numero: f.numero,
          sub: `${fmtCOP(f.total)} · ${val.ok ? 'igual al RH (± $1)' : 'difiere del RH en ' + fmtCOP(val.diferencia)}`,
          fecha: f.registrada_en || `${f.fecha} 12:00`, usuario: nombreCorto(f.registrada_por || 'Lucrecia'), cufe: f.cufe || '', cufe_prueba: !!f.cufe_prueba,
          docs: [{ nombre: `Factura ${f.numero} (emitida en Helisa)`, numero: f.numero, fecha: f.fecha, hash: f.cufe ? 'CUFE ' + f.cufe : '', externo: true }],
          detalle: [['Fecha de la factura', fmtFecha(f.fecha)], ['Vence', fmtFecha(f.vence)], ['Total', fmtCOP(f.total)], ['Validación contra el RH', val.ok ? `Coincide (diferencia ${fmtCOP(val.diferencia)})` : `Diferencia de ${fmtCOP(val.diferencia)}`], ['Registro en el sistema', VIA_REGISTRO_LABEL[f.via_registro] || f.origen || '—'], ['Pedido', f.pedido || '—'], ['CUFE', f.cufe ? `${f.cufe.slice(0, 24)}…${f.cufe_prueba ? ' (de prueba)' : ''}` : 'No registrado']],
          enlace: { href: `cierre.html#${x.p.id}|${x.c.id}`, texto: 'Ver en el cierre' },
          buscar: [f.cufe || ''],
          eventos: [{ en: `${f.fecha} 12:00`, solo_fecha: true, quien: 'Helisa', accion: `Se elaboró la ${f.numero} llamando el pedido y se envió a la DIAN`, nivel: 'ok' }, ...(f.registrada_en ? [{ en: f.registrada_en, quien: nombreCorto(f.registrada_por || 'Lucrecia'), accion: `Registró la ${f.numero} en el sistema`, detalle: (VIA_REGISTRO_LABEL[f.via_registro] || '') + (val.ok ? ' · coincide con el RH' : ''), nivel: val.ok ? 'ok' : 'alerta' }] : [])],
        };
      },
      recibos(x) {
        const f = x.factura; if (!f) return null;
        const anulados = x.recibos.filter((r) => r.estado === 'anulado');
        const suma = x.validos.reduce((a, r) => a + r.aplicaciones.filter((y) => y.factura === f.id).reduce((s, y) => s + y.valor, 0), 0);
        const eventos = [];
        x.recibos.forEach((r) => {
          eventos.push({ en: `${r.fecha} ${r.hora}`, quien: nombreCorto(operario(r.operario).nombre), accion: `Emitió el recibo de caja ${r.consecutivo} · ${fmtCOP(r.valor)}`, detalle: TIPO_RECIBO_LABEL[r.tipo] || '', nivel: 'ok' });
          if (r.entregado_en) eventos.push({ en: r.entregado_en, quien: 'Oficina', accion: `Recibió el efectivo del recibo ${r.consecutivo}`, nivel: 'ok' });
          if (r.estado === 'anulado') eventos.push({ en: r.anulado_en, quien: nombreCorto(r.anulado_por), accion: `Anuló el recibo ${r.consecutivo}`, detalle: r.anulacion_motivo, nivel: 'alerta' });
        });
        if (!x.validos.length) {
          if (f.pagada_otro_medio) return { estado: 'ok', numero: 'Pago por otro medio', sub: f.pago_otro_medio_nota || 'Marcado por Facturación', fecha: f.pago_otro_medio_en || '', usuario: nombreCorto(f.pago_otro_medio_por || ''), detalle: [['Pago', f.pago_otro_medio_nota || '—'], ['Saldo de referencia', fmtCOP(x.saldo)]], eventos: f.pago_otro_medio_en ? [{ en: f.pago_otro_medio_en, quien: nombreCorto(f.pago_otro_medio_por || ''), accion: 'Marcó el pago por otro medio (solo para el saldo de referencia)', detalle: f.pago_otro_medio_nota, nivel: 'ok' }] : [] };
          const vencida = f.vence < HOY;
          return { estado: anulados.length ? 'alerta' : (vencida ? 'alerta' : 'pendiente'), alerta: anulados.length > 0, numero: anulados.length ? `Recibo ${anulados[0].consecutivo} anulado` : 'Sin pagos',
            sub: anulados.length ? 'Falta emitir un recibo nuevo' : `${vencida ? 'Vencida' : 'Vence'} el ${fmtFechaCorta(f.vence)} · saldo ${fmtCOP(x.saldo)}`,
            docs: anulados.map((r) => ({ nombre: `Recibo de caja ${r.consecutivo} (anulado)`, numero: String(r.consecutivo), fecha: `${r.fecha} ${r.hora}`, hash: hashFake(r.id), href: `../documentos/recibo.html#${r.id}`, estado: 'anulado' })),
            detalle: [['Factura', `${f.numero} · ${fmtCOP(f.total)}`], ['Vence', fmtFecha(f.vence)], ['Saldo de referencia', fmtCOP(x.saldo)]], eventos };
        }
        const ult = x.validos[x.validos.length - 1];
        return {
          estado: x.saldo <= 0 ? 'ok' : 'curso', alerta: anulados.length > 0,
          numero: x.validos.map((r) => 'Recibo ' + r.consecutivo).join(', '), sub: `${fmtCOP(suma)} · saldo ${fmtCOP(x.saldo)}`,
          aviso: anulados.length ? `Recibo ${anulados.map((r) => r.consecutivo).join(', ')} anulado antes` : '',
          fecha: `${ult.fecha} ${ult.hora}`, usuario: nombreCorto(operario(ult.operario).nombre), hash: hashFake(ult.id), valor: suma,
          docs: x.recibos.map((r) => ({ nombre: `Recibo de caja ${r.consecutivo}${r.estado === 'anulado' ? ' (anulado)' : ''}`, numero: String(r.consecutivo), fecha: `${r.fecha} ${r.hora}`, hash: hashFake(r.id), href: `../documentos/recibo.html#${r.id}`, estado: r.estado })),
          detalle: [['Aplicado a', `${f.numero} · ${fmtCOP(suma)}`], ['Saldo de referencia', fmtCOP(x.saldo)], ['Estado', x.validos.map((r) => `${r.consecutivo}: ${ESTADO_RECIBO_LABEL[r.estado] || r.estado}`).join(' · ')]],
          enlace: { href: 'recaudo.html', texto: 'Ver en recaudo' },
          eventos,
        };
      },
      rc(x) {
        const f = x.factura; if (!f) return null;
        if (!x.validos.length) return f.pagada_otro_medio ? { estado: 'na', numero: 'No aplica', sub: 'El pago se registró directamente en Helisa' } : null;
        const con = x.validos.filter((r) => r.archivo);
        if (!con.length) return { estado: 'pendiente', numero: 'Sin archivo', sub: `Falta generar el archivo RC (${x.validos.length} recibo${x.validos.length > 1 ? 's' : ''} ${x.validos.map((r) => (ESTADO_RECIBO_LABEL[r.estado] || r.estado).toLowerCase()).join(', ')})` };
        const a = archivos_plano.find((y) => y.id === con[con.length - 1].archivo) || {};
        return {
          estado: a.estado === 'importado' ? 'ok' : 'curso', numero: a.nombre ? a.nombre.replace(/^COMSERVA_|\.xls$/g, '').replace(/_/g, ' ') : 'Archivo RC', sub: ESTADO_PLANO_LABEL[a.estado] || '',
          fecha: a.importado_en || a.generado_en, usuario: nombreCorto(a.importado_por || a.generado_por), hash: a.sha256,
          docs: [{ nombre: `Archivo de movimiento contable ${a.nombre}`, numero: a.nombre, fecha: a.generado_en, hash: a.sha256, href: 'planos.html#rc' }],
          detalle: [['Contenido', 'Débito a caja o bancos, crédito a cartera 1305 con la factura que se cruza'], ['Libros', 'Local o tributario (F) y NIIF (N), por confirmar con Julio'], ['Tipo de recibo en Helisa', helisa.tipo_recibo.codigo + ' (archivo de Julio; confirmar si equivale a RC1 o RC2)'], ['Estructura', 'Recibo RC de 17 columnas y 4 filas: caja F 11050501 y N 111050501, cartera F 13050501 y N 112050501; cruce y cobrador solo en la cartera F (Excel de Julio, 23 oct; cuentas N por confirmar con el contador)']],
          enlace: { href: 'planos.html#rc', texto: 'Ver archivos RC' },
          buscar: [a.nombre || ''],
          eventos: [{ en: a.generado_en, quien: nombreCorto(a.generado_por), accion: `Generó el archivo ${a.nombre}`, nivel: 'ok' }, ...(a.importado_en ? [{ en: a.importado_en, quien: nombreCorto(a.importado_por), accion: 'Lo importó en Helisa (Importación de movimiento contable, módulo de cartera)', nivel: 'ok' }] : [])],
        };
      },
      cruce(x) {
        const f = x.factura; if (!f) return null;
        if (!x.validos.length) return f.pagada_otro_medio ? { estado: 'na', numero: 'En Helisa', sub: 'Pago por otro medio: se cruza directamente en Helisa' } : null;
        const cz = x.validos.filter((r) => r.estado === 'cruzado');
        if (!cz.length) return { estado: 'pendiente', numero: 'Sin cruce', sub: 'Falta importar el RC y registrar el recibo definitivo' };
        const ult = cz[cz.length - 1];
        return {
          estado: cz.length === x.validos.length && x.saldo <= 0 ? 'ok' : 'curso', numero: cz.map((r) => r.recibo_helisa).join(', '), sub: x.saldo <= 0 ? 'Factura pagada · saldo $0' : `Saldo ${fmtCOP(x.saldo)}`,
          fecha: ult.cruzado_en, usuario: 'Lucrecia', hash: hashFake('cruce|' + cz.map((r) => r.id).join('|')),
          docs: cz.map((r) => ({ nombre: `Recibo definitivo ${r.recibo_helisa} (Helisa)`, numero: r.recibo_helisa, fecha: r.recibo_helisa_fecha, hash: '', externo: true })),
          detalle: [['Recibo provisional → definitivo', cz.map((r) => `${r.consecutivo} → ${r.recibo_helisa}`).join(' · ')], ['Factura cruzada', f.numero], ['Saldo de referencia', fmtCOP(x.saldo)]],
          eventos: cz.map((r) => ({ en: r.cruzado_en, quien: 'Lucrecia', accion: `Registró el recibo definitivo ${r.recibo_helisa}: pago cruzado con la ${f.numero}`, nivel: 'ok' })),
        };
      },
    };

    // --- armado de la cadena ------------------------------------------------------------
    const registros = []; // eslabones declarados como datos por cada propuesta
    function cadena(clienteId, periodoId) {
      const x = contexto(clienteId, periodoId);
      const flujo = flujos[api.propuesta] || flujos.P1;
      const eslabones = flujo.map((tipo, i) => {
        let e = api.constructores[tipo] ? api.constructores[tipo](x) : null;
        api.registros.filter((r) => r.tipo === tipo && r.cliente === clienteId && r.periodo === periodoId).forEach((r) => { e = Object.assign({}, e || {}, r); });
        if (!e) e = { estado: 'pendiente', numero: 'Pendiente', sub: (tipos[tipo] || {}).falta || '' };
        e = Object.assign({ docs: [], detalle: [], eventos: [], buscar: [] }, e, { tipo, paso: i + 1, def: tipos[tipo] || { etiqueta: tipo, corto: tipo, icono: 'archivo', grupo: '' } });
        x.eslabon[tipo] = e; // los constructores siguientes pueden leer los eslabones anteriores
        return e;
      });
      const bitacora = [];
      eslabones.forEach((e) => e.eventos.filter((ev) => ev.en).forEach((ev) => bitacora.push({ ...ev, tipo: e.tipo, etiqueta: e.def.corto })));
      bitacora.sort((a, b) => a.en.localeCompare(b.en));
      const completos = eslabones.filter((e) => e.estado === 'ok' || e.estado === 'na').length;
      const siguiente = eslabones.find((e) => e.estado !== 'ok' && e.estado !== 'na') || null;
      const hashes = eslabones.flatMap((e) => e.docs.map((d) => d.hash)).filter(Boolean);
      return { cliente: x.c, periodo: x.p, cierre: x.cz, factura: x.factura, saldo: x.saldo, eslabones, bitacora, completos, total: eslabones.length, siguiente, alertas: eslabones.filter((e) => e.alerta).length, cerrado: !!x.cierre, hash: hashFake('expediente|' + hashes.join('|')) };
    }
    // Agrupa varios eslabones en una celda de la matriz: muestra el primero que no esté completo, o el último
    function combinar(es) { return es.find((e) => e.estado !== 'ok' && e.estado !== 'na') || es[es.length - 1]; }
    const clientesDelPeriodo = (p) => clientes.filter((c) => (c.estado === 'activo' && (!c.creado || c.creado <= p.fin)) || visitas.some((v) => v.cliente === c.id && v.periodo === p.id));
    function matriz(periodoId) {
      const p = byId(periodos, periodoId); if (!p) return [];
      const cols = columnas[api.propuesta] || columnas.P1;
      return clientesDelPeriodo(p).map((c) => {
        const ch = cadena(c.id, periodoId);
        return { cliente: c, cadena: ch, cerrado: ch.cerrado, celdas: cols.map((col) => ({ col, e: combinar(col.tipos.map((t) => ch.eslabones.find((e) => e.tipo === t)).filter(Boolean)) })) };
      });
    }
    // Búsqueda por cualquier número: constancia, planilla, pedido, FVE o CUFE, recibo, archivo
    const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
    function buscar(q) {
      const nq = norm(q); if (nq.length < 3) return [];
      const out = []; const vistos = new Set();
      periodos.filter((p) => visitas.some((v) => v.periodo === p.id)).forEach((p) => clientesDelPeriodo(p).forEach((c) => {
        cadena(c.id, p.id).eslabones.forEach((e) => {
          const nums = [e.numero, ...e.docs.map((d) => d.numero), ...e.docs.map((d) => d.nombre), ...(e.buscar || [])].filter(Boolean);
          const hs = [e.hash, e.cufe, ...e.docs.map((d) => String(d.hash || '').replace(/^CUFE /, ''))].filter(Boolean);
          let hit = nums.find((t) => norm(t).includes(nq));
          if (!hit && nq.length >= 6) { const h = hs.find((t) => norm(t).startsWith(nq)); if (h) hit = (h === e.cufe ? 'CUFE ' : 'Hash ') + h.slice(0, 16) + '…'; }
          const k = `${c.id}|${p.id}|${e.tipo}`;
          if (hit && !vistos.has(k)) { vistos.add(k); out.push({ cliente: c, periodo: p, tipo: e.tipo, etiqueta: e.def.etiqueta, numero: e.numero, coincide: hit, estado: e.estado }); }
        });
      }));
      return out;
    }
    // Expediente del cliente-periodo: índice de documentos con su huella (TRZ-05)
    function expediente(clienteId, periodoId) {
      const ch = cadena(clienteId, periodoId);
      const docs = [];
      ch.eslabones.forEach((e) => e.docs.forEach((d) => docs.push({ ...d, eslabon: e.def.etiqueta, paso: e.paso })));
      return { cadena: ch, docs, hash: ch.hash, generado_en: `${HOY} 08:00` };
    }

    const api = { propuesta: 'P1', ESTADO, tipos, flujos, columnas, tipo_factura, filtros, textos, constructores, registros, cadena, matriz, buscar, expediente, contexto, combinar };
    return api;
  })();

  // =====================================================================
  // PROPUESTA 1 · RH digital hasta Helisa (pedidos y recibos)
  // ---------------------------------------------------------------------
  // Dos modalidades:
  //   1A · Archivos planos (base): el sistema genera el archivo de PEDIDOS (OP, 24 columnas con fila de títulos, .xlsx, sin cuentas)
  //        y el de RECIBOS (RC, 17 columnas, 4 filas por recibo en los libros F y N); Lucrecia los importa en Helisa.
  //        Estructuras oficiales del Excel de Julio (23 oct). Falta la importación de prueba y confirmar el formato que acepta el asistente (xlsx, xls o txt).
  //   1B · API Helisa Conekta (opcional; SIMULADA en el mockup): el sistema crea clientes, inserta pedidos y recibos
  //        y lee las FVE y la cartera. Los archivos quedan de contingencia.
  // En las dos, la factura se sigue elaborando UNA A UNA en Helisa llamando el pedido (F3).
  // La modalidad se elige en panel/planos.html → «Conexión con Helisa» y se recuerda solo en este navegador.
  // Con 1B el mockup supone Conekta activa desde el 1 de octubre de 2026: septiembre se hizo con archivos y octubre
  // va por API. Códigos de concepto de la cartilla de Julio (2 básico, 3 kilos adicionales, 54 exento); el esquema «solo por kilo»
  // y el cobro fijo siguen con marcador <COD_…> hasta que Julio confirme el código.
  // Todo lo que no es de Cofema de septiembre es DATO DE PRUEBA.
  // =====================================================================
  const p1 = (function () {
    const KEY = 'rhd-v6-p1-modalidad';
    let modalidad = '1A';
    try { if (window.localStorage && window.localStorage.getItem(KEY) === '1B') modalidad = '1B'; } catch (e) { /* almacenamiento bloqueado: queda 1A */ }
    const MODALIDADES = {
      '1A': { codigo: '1A', nombre: 'Archivos planos', titulo: '1A · Archivos planos', resumen: 'El sistema genera el archivo de pedidos (OP) y el de recibos (RC); Lucrecia los descarga y los importa en Helisa. Sin costo recurrente adicional.' },
      '1B': { codigo: '1B', nombre: 'API Helisa Conekta', titulo: '1B · API Helisa Conekta (simulado)', resumen: 'El sistema crea clientes, inserta pedidos y recibos y lee las FVE y la cartera por API, sin subir archivos. Los archivos planos quedan de contingencia. Comserva paga la suscripción.' },
    };
    function setModalidad(m) { try { window.localStorage.setItem(KEY, m === '1B' ? '1B' : '1A'); return true; } catch (e) { return false; } }
    // Condiciones oficiales de Conekta (helisa.com, consultado el 22 oct 2026). IVA y hosting: por confirmar.
    const CONEKTA = { desde: '2026-10-01', precio_mes: 211680, nota_precio: 'IVA no indicado; exige Helisa en el hosting de Helisa (≈ $60.000 por usuario al mes); contrato anual', url: 'http://webconekta.helisa.com:9590/KansasWS/', tope_mes: 100000, tope_dia: 5000, respuesta_seg: 4, disponibilidad: '97,5 %' };

    // ---------- formato de los archivos ----------
    const PH = (k) => `<${k}>`;                       // marcador de un dato que falta (se resalta en pantalla)
    const esPH = (v) => /^<[A-Z0-9_]+>$/.test(String(v));
    const numPlano = (n) => { const v = r2(n); return Number.isInteger(v) ? String(v) : v.toFixed(2); };
    const textoTxt = (s) => sinTildes(String(s ?? '')).toUpperCase().replace(/\|/g, '/');
    const COD_PH = { basico: 'COD_BASICO', kg_adicionales: 'COD_KG_ADIC', kg_todos: 'COD_KILO', fijo: 'COD_FIJO' };

    // Las 24 columnas del pedido OP, con los títulos exactos de la hoja «Plano Pedidos» del Excel de Julio (23 oct).
    // estado: 'oficial' = tomado del Excel de Julio; 'por confirmar' = falta la respuesta de Julio o la importación de prueba.
    const CAMPOS_OP = [
      ['TIPO', 'constante', 'OP', 'Sí', 'oficial', 'Hay que habilitar el documento Pedido en la Helisa de Comserva (Fase 0).'],
      ['NUMERO', 'campo', 'Consecutivo del pedido dentro del archivo; todas las líneas del pedido lo repiten', 'Sí', 'oficial', 'En el ejemplo de Julio: 1, 2… El sistema guarda además su número OP propio.'],
      ['FECHA', 'campo', 'Fecha del pedido (celda de fecha, dd/mm/aaaa)', 'Sí', 'oficial', ''],
      ['IDENTIDAD CLIENTE', 'campo', 'NIT o cédula del cliente, sin DV', 'Sí', 'oficial', ''],
      ['CÓDIGO DEL CLIENTE', 'equivalencia', 'Código del cliente o de la sede en Helisa', 'Por confirmar', 'por confirmar', 'Vacío en el ejemplo de Julio cuando es el mismo NIT. ¿Siempre vacío o con el código de la sede?'],
      ['IDENTIDAD VENDEDOR', 'constante', '828002730 · COMSERVA (NIT sin DV), en todas las líneas', 'Sí', 'oficial', ''],
      ['TIPO CONCEPTO', 'linea', '2 = servicio · 3 = comentario', 'Sí', 'oficial', ''],
      ['CODIGO CONCEPTO', 'equivalencia', 'Cartilla: 2 básico · 3 kilos adicionales · 54 exento (4 a 21 por categoría)', 'Sí en servicio', 'oficial', 'Vacío en la línea de comentario. Solo por kilo y cobro fijo: código por confirmar.'],
      ['CODIGO UNIDAD', 'vacio', 'Vacío', 'No', 'oficial', ''],
      ['REFERENCIA', 'vacio', 'Vacío', 'No', 'oficial', ''],
      ['CODIGO BARRAS', 'vacio', 'Vacío', 'No', 'oficial', ''],
      ['ARTÍCULO/SERVICIO', 'linea', 'Nombre del servicio o texto del comentario', 'Sí', 'oficial', 'Longitud máxima por confirmar.'],
      ['CODIGO BODEGA', 'vacio', 'Vacío', 'No', 'oficial', ''],
      ['LISTA DE PRECIO', 'equivalencia', 'Lista del cliente (1 a 7), en las líneas de servicio', 'Sí en servicio', 'oficial', 'Columna oficial; la lista de cada cliente la confirma Julio. Listas especiales (3 a 7): el valor va en el pedido.'],
      ['CANTIDAD', 'linea', '1 en el básico; kilos adicionales o kilos del periodo', 'Sí en servicio', 'oficial', 'Número con decimales (393.85 en la celda).'],
      ['VALOR UNITARIO', 'linea', 'Básico, precio del kilo o valor fijo, sin IVA', 'Sí en servicio', 'oficial', ''],
      ['VALOR TOTAL', 'vacio', 'Vacío: Helisa multiplica', 'No', 'oficial', ''],
      ['TARIFA DESCUENTO', 'vacio', 'Vacío', 'No', 'oficial', ''],
      ['VALOR DESCUENTO', 'vacio', 'Vacío', 'No', 'oficial', ''],
      ['TARIFA DESCUENTO ADICIONAL', 'vacio', 'Vacío', 'No', 'oficial', ''],
      ['VALOR DESCUENTO ADICIONAL', 'vacio', 'Vacío', 'No', 'oficial', ''],
      ['Centro de costo', 'constante', '0101 (texto) en todas las líneas, también la de comentario', 'Sí', 'oficial', ''],
      ['CÓDIGO NEGOCIO', 'vacio', 'Vacío', 'No', 'oficial', ''],
      ['Obsequio', 'vacio', 'Vacío', 'No', 'oficial', ''],
    ].map(([titulo, origen, valor, oblig, estado, nota], i) => ({ n: i + 1, titulo, origen, valor, oblig, estado, nota }));

    const plantilla_op = {
      id: 'pl-op-2', tipo: 'OP', version: 2, nombre: 'Pedido OP oficial · Excel de Julio, 23 oct (24 columnas)', familia: 'pedido',
      estado: 'oficial', estado_nota: 'estructura oficial; falta la importación de prueba en la empresa de pruebas de Julio', creada_por: 'Equipo RH digital', creada_en: '2026-10-23',
      nota_cambio: 'Estructura oficial de la hoja «Plano Pedidos» que envió Julio el 23 de octubre: 24 columnas con fila de títulos, archivo .xlsx, TIPO OP, NIT sin DV, vendedor 828002730, centro de costo 0101 como texto y negocio, bodega, total y descuentos vacíos. Reemplaza la v1 (TXT con «|» sin títulos, armada con el pedido de otra empresa visto el 21 de octubre), que queda retirada. Se aprueba cuando el pedido de Cofema de septiembre se importe sin errores; si el asistente no lee .xlsx, se exporta .xls o .txt.',
      formato: 'xlsx', separador: ';', codificacion: 'windows-1252', fin_linea: 'CRLF', con_titulos: true, formato_fecha: 'dd/MM/yyyy', simbolo_decimal: '.', separador_miles: false, mayusculas: true, quitar_tildes: true, valor_total: 'vacio', prefijo_archivo: 'COMSERVA',
      validaciones: { separador: false, codigo_cliente: true, concepto: true, subtotal: true, lista_especial: true },
      constantes: { tipo: 'OP', vendedor: helisa.vendedor.identidad, centro_costo: helisa.centro_costo.codigo, negocio: '', bodega: '' },
      retirada: { id: 'pl-op-1', version: 1, nombre: 'Pedido Helisa (TXT con «|», sin títulos)', nota: 'Armada el 22 de octubre con el pedido de otra empresa visto el 21; retirada al llegar el Excel de Julio.' },
      campos: CAMPOS_OP,
      lineas: [
        { orden: 1, regla: 'basico', etiqueta: 'Servicio básico mensual', tipo_concepto: 2, esquemas: ['basico_kg'], cantidad: '1', unitario: 'Básico de la tarifa', texto: 'Nombre del concepto', omitir_cero: false },
        { orden: 2, regla: 'kg_adicionales', etiqueta: 'Kilos adicionales', tipo_concepto: 2, esquemas: ['basico_kg'], cantidad: 'Kilos − kilos incluidos', unitario: 'Precio del kilo adicional', texto: 'KILOGRAMOS ADICIONALES', omitir_cero: true },
        { orden: 3, regla: 'kg_todos', etiqueta: 'Solo por kilo', tipo_concepto: 2, esquemas: ['solo_kg'], cantidad: 'Kilos del periodo', unitario: 'Precio del kilo', texto: 'Nombre del concepto', omitir_cero: false },
        { orden: 4, regla: 'fijo', etiqueta: 'Cobro fijo mensual', tipo_concepto: 2, esquemas: ['fijo'], cantidad: '1', unitario: 'Valor fijo', texto: 'Nombre del concepto', omitir_cero: false },
        { orden: 5, regla: 'comentario_mes', etiqueta: 'Comentario del mes', tipo_concepto: 3, esquemas: ['basico_kg', 'solo_kg', 'fijo'], cantidad: '', unitario: '', texto: 'SERVICIO ESPECIAL DE ASEO PRESTADO MES DE {MES} {AÑO}', omitir_cero: false, nota: 'Oficial (Excel de Julio)' },
        { orden: 6, regla: 'comentario_rh', etiqueta: 'Comentario de soporte', tipo_concepto: 3, esquemas: ['basico_kg', 'solo_kg', 'fijo'], cantidad: '', unitario: '', texto: 'PLANILLA RH {RH} - {KG} KG - {VISITAS} VISITAS - DEL {INICIO} AL {FIN}', omitir_cero: false, nota: 'Propuesta del sistema: el ejemplo de Julio trae una sola línea de comentario (por confirmar)' },
      ],
    };

    // Recibo RC oficial: hoja «Plano Recibos» del Excel de Julio (23 oct). 17 columnas, títulos exactos con sus erratas
    // («INDENTIDAD», «VENDEDDOR»), y 4 filas por recibo: caja F y N al débito, cartera F y N al crédito.
    // El cruce (tipo, número y cuota del documento que afecta) y el cobrador van SOLO en la fila de cartera F.
    const COLUMNAS_RC = ['TIPO', 'FECHA', 'NUMERO DE DOC.', 'CUENTA', 'CONCEPTO', 'CENTRO', 'VALOR', 'NATURALEZA', 'INDENTIDAD TERCERO', 'CUENTA BANCARIA', 'ID VENDEDDOR / COBRADOR', 'FECHA CHEQUE', 'CLASE MOV.', 'IND. A AFECTAR', 'TIPO DE DOCUMENTO QUE AFECTA', 'NUMERO DE DOCUMENTO QUE AFECTA', 'CUOTA QUE AFECTA'];
    const VACIAS_RC = ['CENTRO', 'CUENTA BANCARIA', 'FECHA CHEQUE'];
    const plantilla_rc = {
      id: 'pl-rc-2', tipo: 'RC', version: 2, nombre: 'Recibo RC oficial · Excel de Julio, 23 oct (17 columnas, 4 filas)', familia: 'movimiento',
      estado: 'oficial', estado_nota: 'estructura oficial; cuentas del libro N y prefijo del cruce por confirmar', creada_por: 'Equipo RH digital', creada_en: '2026-10-23',
      nota_cambio: 'Estructura oficial de la hoja «Plano Recibos» que envió Julio el 23 de octubre: 17 columnas con fila de títulos (con las erratas del archivo), TIPO RC, número del recibo a 8 dígitos, CENTRO vacío y 4 filas por recibo (caja F 11050501 y N 111050501 al débito; cartera F 13050501 y N 112050501 al crédito). La fila de cartera F lleva el cobrador (828002730) y el cruce: tipo, número y cuota del documento que afecta. Reemplaza la plantilla de 22 columnas de la v5 (DOC FUENTE), que queda retirada. Por confirmar: cuentas del libro N con el contador, prefijo del cruce (FEV en el ejemplo, FVE en las facturas) y cuenta de bancos para transferencias.',
      formato: 'xlsx', separador: ';', codificacion: 'windows-1252', fin_linea: 'CRLF', con_titulos: true, formato_fecha: 'dd/MM/yyyy', simbolo_decimal: '.', mayusculas: true, quitar_tildes: true, prefijo_archivo: 'COMSERVA',
      tipo_documento: 'RC', tipo_documento_nota: 'El archivo de Julio dice RC; confirmar si equivale a RC1 o RC2', centro_costo: '', numero_formato: '0000000#',
      importar_a: { cartera: true, bancos: false, acreedores: false }, columna_cruce: 'TIPO / NUMERO DE DOCUMENTO QUE AFECTA + CUOTA', formato_cruce: 'FVE · 25756 · 1', formato_cruce_nota: 'Prefijo en su propia columna: FEV en el ejemplo de Julio, FVE en las facturas de Comserva (por confirmar)', prefijo_cruce: 'FVE', cobrador: helisa.vendedor.identidad,
      validaciones: { cuadre: true, fve: true, tercero: true },
      columnas: COLUMNAS_RC.map((titulo, i) => ({ orden: i + 1, titulo, origen: VACIAS_RC.includes(titulo) ? 'vacio' : 'campo', campo: '', constante: '' })),
      retirada: { id: 'pl-rc-1', version: 1, nombre: 'Recibo · movimiento contable (22 columnas de la v5)', nota: 'DOC FUENTE con la FVE, cuentas 110505/130505 de ejemplo y TIPO RC1 o RC2: retirada al llegar el Excel de Julio.' },
      lineas: [
        { orden: 1, tipo: 'caja', etiqueta: 'Caja F (efectivo)', clase: 'F', ind: 1, cuenta: '11050501', cuenta_estado: 'oficial', naturaleza: 'D', concepto: 'PAGO FACTURA {FVE}' },
        { orden: 2, tipo: 'caja', etiqueta: 'Caja N', clase: 'N', ind: 1, cuenta: '111050501', cuenta_estado: 'por confirmar', naturaleza: 'D', concepto: 'PAGO FACTURA {FVE}' },
        { orden: 3, tipo: 'cartera', etiqueta: 'Cartera F', clase: 'F', ind: 2, cuenta: '13050501', cuenta_estado: 'oficial', naturaleza: 'C', concepto: 'PAGO FACTURA {FVE}', cruce: true, cobrador: true },
        { orden: 4, tipo: 'cartera', etiqueta: 'Cartera N', clase: 'N', ind: 2, cuenta: '112050501', cuenta_estado: 'por confirmar', naturaleza: 'C', concepto: 'PAGO FACTURA {FVE}' },
      ],
    };
    const CUENTA_PH = { caja: 'CUENTA_CAJA_N', cartera: 'CUENTA_1305_N', banco: 'CUENTA_BANCO_N' };

    // ---------- líneas y campos del pedido ----------
    function lineasPedido(ped) {
      const cz = cierreCliente(ped.cliente, ped.periodo); const f = cz.factura; if (!f) return [];
      const p = byId(periodos, ped.periodo); const out = [];
      f.lineas.forEach((l) => { const e = equivalencia(l.componente) || {}; out.push({ tipo_concepto: 2, componente: l.componente, codigo: e.codigo_concepto || '', codigo_ph: COD_PH[l.componente] || 'COD_CONCEPTO', concepto: e.nombre_concepto || l.concepto, cantidad: l.cantidad, unitario: l.unitario, valor: l.valor }); });
      const mes = p.nombre.split(' ')[0].toUpperCase(); const anio = p.id.slice(0, 4);
      const rh = ped.rh || numeroRH(ped.cliente, ped.periodo) || '';
      const nv = cz.visitas.length;
      out.push({ tipo_concepto: 3, componente: 'comentario', texto: `SERVICIO ESPECIAL DE ASEO PRESTADO MES DE ${mes} ${anio}` });
      out.push({ tipo_concepto: 3, componente: 'comentario', texto: `PLANILLA RH ${rh} - ${fmtKg(cz.kg)} KG - ${nv} VISITA${nv === 1 ? '' : 'S'} - DEL ${fmtFechaCorta(p.inicio)} AL ${fmtFechaCorta(p.fin)}` });
      return out;
    }
    // Los 24 valores de una línea: { v: texto, m: 'falta' | 'prueba' | '' }
    function camposLinea(ped, l, opts = {}) {
      const c = cliente(ped.cliente); const pl = opts.plantilla || plantilla_op; const k = pl.constantes;
      const cod = c.helisa && c.helisa.codigo_cliente; const serv = l.tipo_concepto === 2;
      return [
        { v: k.tipo }, { v: String(opts.numero || 1) }, { v: fmtFechaCorta(opts.fecha || ped.fecha) }, { v: c.nit },
        cod ? { v: cod, m: c.helisa.codigo_estado === 'prueba' ? 'prueba' : '' } : { v: PH('COD_CLIENTE'), m: 'falta' },
        { v: k.vendedor }, { v: String(l.tipo_concepto) },
        serv ? (l.codigo ? { v: l.codigo } : { v: PH(l.codigo_ph), m: 'falta' }) : { v: '' },
        { v: '' }, { v: '' }, { v: '' },
        { v: textoTxt(serv ? l.concepto : l.texto), m: serv ? '' : 'comentario' },
        { v: k.bodega || '' }, serv ? (c.helisa && c.helisa.lista_precio ? { v: c.helisa.lista_precio, m: 'confirmar' } : { v: PH('LISTA'), m: 'falta' }) : { v: '' },
        { v: serv ? numPlano(l.cantidad) : '' }, { v: serv ? numPlano(l.unitario) : '' },
        { v: serv && pl.valor_total === 'calculado' ? numPlano(l.valor) : '' },
        { v: '' }, { v: '' }, { v: '' }, { v: '' },
        { v: k.centro_costo }, { v: k.negocio || '' }, { v: '' },
      ];
    }
    function validarPedido(ped, pl = plantilla_op) {
      const c = cliente(ped.cliente); const cz = cierreCliente(ped.cliente, ped.periodo); const errores = [], avisos = [];
      if (!cz.factura) errores.push(`${c.nombre_comercial}: sin tarifa vigente; no se puede liquidar.`);
      if (pl.validaciones.codigo_cliente && (!c.helisa || !c.helisa.codigo_cliente)) errores.push(`${c.nombre_comercial}: cliente sin código en Helisa. No se exporta hasta completar la tabla de equivalencias.`);
      const ls = lineasPedido(ped);
      const sinCod = [...new Set(ls.filter((l) => l.tipo_concepto === 2 && !l.codigo).map((l) => l.concepto))];
      if (pl.validaciones.concepto && sinCod.length) avisos.push(`Concepto sin código de Helisa (${sinCod.join(' · ')}): sale con el marcador hasta recibir la cartilla de conceptos.`);
      if (pl.validaciones.separador && ls.some((l) => String(l.tipo_concepto === 2 ? l.concepto : l.texto).includes(pl.separador))) errores.push(`${c.nombre_comercial}: un texto contiene el separador «${pl.separador}».`);
      const sub = r2(ls.filter((l) => l.tipo_concepto === 2).reduce((a, l) => a + r2(l.cantidad * l.unitario), 0));
      if (pl.validaciones.subtotal && cz.factura && Math.abs(sub - cz.factura.subtotal) > 1) errores.push(`${c.nombre_comercial}: el pedido (${fmtCOP(sub)}) no cuadra con el subtotal del RH (${fmtCOP(cz.factura.subtotal)}).`);
      if (ls.some((l) => l.tipo_concepto === 2 && !(l.cantidad > 0))) errores.push(`${c.nombre_comercial}: hay una línea de servicio con cantidad 0.`);
      const lp = listaPrecio(c.helisa && c.helisa.lista_precio);
      if (pl.validaciones.lista_especial && lp && lp.especial && ls.some((l) => l.tipo_concepto === 2 && !(l.unitario > 0))) errores.push(`${c.nombre_comercial}: lista especial ${lp.id} (${lp.nombre}) sin valor unitario en el pedido.`);
      if (lp && lp.especial) avisos.push(`${c.nombre_comercial}: lista especial ${lp.id} · ${lp.nombre} (supuesta: su tarifa no coincide con las listas básicas 1 y 2; Julio confirma la lista de cada cliente). El valor unitario va en el pedido.`);
      return { errores, avisos, subtotal: sub, rh: cz.factura ? cz.factura.subtotal : null, total_rh: cz.factura ? cz.factura.total : null, lineas: ls };
    }
    const pedidosDeArchivo = (a) => pedidos.filter((x) => x.archivo === a.id || (x.historial || []).some((h) => h.archivo === a.id));
    function filasArchivoOP(a, pedidosLista) {
      const ps = pedidosLista || pedidosDeArchivo(a); const fecha = a.generado_en ? a.generado_en.slice(0, 10) : null;
      return ps.flatMap((ped, n) => lineasPedido(ped).map((l, i) => ({ ped, l, primera: i === 0, campos: camposLinea(ped, l, { fecha, numero: n + 1 }) })));
    }
    // Vista en texto del .xlsx (fila de títulos + filas, separadas por «;»): el mockup descarga esta vista; el sistema real escribe el .xlsx
    const txtFilas = (filas) => [CAMPOS_OP.map((c) => c.titulo).join(';')].concat(filas.map((f) => f.campos.map((x) => x.v).join(';'))).join('\r\n');
    const txtArchivoOP = (a, ps) => txtFilas(filasArchivoOP(a, ps));

    // ---------- movimiento contable del recibo ----------
    const recibosDeArchivo = (a) => recibos.filter((r) => r.archivo === a.id);
    function movimientoRecibo(r, pl = plantilla_rc) {
      const c = cliente(r.cliente); const filas = []; const apps = r.aplicaciones || [];
      // Orden del Excel de Julio: caja F, caja N, cartera F, cartera N. Si un recibo paga varias facturas, las filas de cartera se repiten por factura.
      const unaFila = (l, ap) => {
        const fa = ap ? factura(ap.factura) : (apps[0] ? factura(apps[0].factura) : null);
        const num = fa ? fa.numero : ''; const pref = (num.match(/^[A-Z]+/) || [''])[0]; const cons = num.replace(/^\D+/, '').trim();
        const fve = fa ? `${pl.prefijo_cruce || pref} ${cons}` : '';
        const valor = l.tipo === 'cartera' ? ap.valor : r.valor;
        const concepto = textoTxt(String(l.concepto).replace('{RECIBO}', r.consecutivo).replace('{TIPO}', TIPO_RECIBO_LABEL[r.tipo] || '').replace('{FVE}', fve));
        filas.push({ recibo: r, clase: l.clase, ind: l.ind, tipo: l.tipo, cuenta: l.cuenta || PH(CUENTA_PH[l.tipo] || 'CUENTA_N'), cuenta_m: l.cuenta ? (l.cuenta_estado === 'por confirmar' ? 'confirmar' : '') : 'falta', naturaleza: l.naturaleza, valor, concepto,
          cruce: l.cruce && fa ? { tipo: pl.prefijo_cruce || pref, numero: cons, cuota: '1' } : null, cobrador: l.cobrador ? pl.cobrador : '', tercero: c.nit });
      };
      pl.lineas.forEach((l) => { if (l.tipo === 'cartera') apps.forEach((ap) => unaFila(l, ap)); else unaFila(l, null); });
      return filas;
    }
    // Una fila del movimiento llevada a las 17 columnas de la plantilla RC oficial
    const pad8 = (n) => String(n).replace(/\D/g, '').padStart(8, '0');
    function camposRC(fila, pl = plantilla_rc) {
      const r = fila.recibo; const cz = fila.cruce; const m = {
        TIPO: { v: pl.tipo_documento }, FECHA: { v: fmtFechaCorta(r.fecha) }, 'NUMERO DE DOC.': { v: pad8(r.consecutivo) },
        CUENTA: { v: fila.cuenta, m: fila.cuenta_m }, CONCEPTO: { v: fila.concepto }, CENTRO: { v: pl.centro_costo || '' }, VALOR: { v: numPlano(fila.valor) }, NATURALEZA: { v: fila.naturaleza },
        'INDENTIDAD TERCERO': { v: fila.tercero }, 'ID VENDEDDOR / COBRADOR': { v: fila.cobrador || '' }, 'CLASE MOV.': { v: fila.clase }, 'IND. A AFECTAR': { v: String(fila.ind) },
        'TIPO DE DOCUMENTO QUE AFECTA': cz ? { v: cz.tipo, m: 'confirmar' } : { v: '' }, 'NUMERO DE DOCUMENTO QUE AFECTA': cz ? { v: cz.numero, m: 'cruce' } : { v: '' }, 'CUOTA QUE AFECTA': cz ? { v: cz.cuota } : { v: '' },
      };
      return pl.columnas.map((col) => m[col.titulo] || { v: '' });
    }
    function filasArchivoRC(a, recibosLista) {
      const rs = recibosLista || recibosDeArchivo(a);
      return rs.flatMap((r) => movimientoRecibo(r).map((f, i) => ({ r, fila: f, primera: i === 0, campos: camposRC(f) })));
    }
    // Vista en texto del .xlsx del recibo (títulos + filas separadas por «;»)
    function csvArchivoRC(a, rs) { const filas = filasArchivoRC(a, rs); return [plantilla_rc.columnas.map((c) => c.titulo).join(';')].concat(filas.map((f) => f.campos.map((x) => x.v).join(';'))).join('\r\n'); }
    function cuadreRC(filas) { const t = { F: { D: 0, C: 0 }, N: { D: 0, C: 0 } }; filas.forEach((f) => { t[f.fila.clase][f.fila.naturaleza] += f.fila.valor; }); return t; }

    // ---------- ajustes de la base para la propuesta 1 ----------
    // Los archivos FV de la v5 no existen en la propuesta 1 (Helisa no importa facturas): se quitan; las plantillas pasan a OP y RC.
    for (let i = archivos_plano.length - 1; i >= 0; i--) if (archivos_plano[i].tipo !== 'RC') archivos_plano.splice(i, 1);
    // Los archivos generados antes del 23 de octubre usaron las plantillas v1 (retiradas): conservan su nombre y se marcan; la vista los muestra con la estructura oficial.
    archivos_plano.forEach((a) => { a.nombre = a.nombre.replace(/\.xls$/, '.csv'); a.plantilla = plantilla_rc.id; a.plantilla_usada = 'v1 (retirada)'; a.filas = recibosDeArchivo(a).reduce((s, r) => s + movimientoRecibo(r).length, 0); a.sha256 = hashFake(a.nombre + a.generado_en); });
    plantillas_plano.splice(0, plantillas_plano.length, plantilla_op, plantilla_rc);
    archivos_op.forEach((a) => { a.plantilla = plantilla_op.id; a.formato = 'txt'; a.plantilla_usada = 'v1 (retirada)'; });
    pedidos.forEach((x) => { x.lineas = lineasPedido(x).length; });
    facturas.forEach((f) => { if (f.periodo === '2026-09') delete f.archivo; });
    archivos_op.forEach((a) => { a.lineas = pedidosDeArchivo(a).reduce((s, x) => s + lineasPedido(x).length, 0); });

    // ---------- cola simulada de Helisa Conekta ----------
    const fSon = facturaDe('c-sonrisas', '2026-09'); const fPv = facturaDe('c-pielviva', '2026-09');
    const OP_LABEL = { crear_cliente: 'Crear cliente', insertar_pedido: 'Insertar pedido', leer_fve: 'Leer FVE', insertar_recibo: 'Insertar recibo', consultar_cartera: 'Consultar cartera' };
    const OP_ENDPOINT = { crear_cliente: 'set/client2_0', insertar_pedido: 'set/order', leer_fve: 'summary/billDetails', insertar_recibo: 'set/document', consultar_cartera: 'summary/portfolioByClient' };
    const COLA_LABEL = { ok: 'Completado', en_cola: 'En cola', enviando: 'Enviando', reintento: 'Reintento programado', error: 'Error · requiere corrección', bloqueado: 'Bloqueado por validación', programada: 'Programada' };
    const cola = [
      { id: 'cnk-0099', op: 'consultar_cartera', doc: 'Cartera de los clientes activos', estado: 'programada', programada: '2026-10-23 06:00', intentos: [], resultado: 'Lectura diaria programada' },
      { id: 'cnk-0098', op: 'leer_fve', doc: 'FVE del 20 al 22 de octubre', estado: 'programada', programada: '2026-10-22 12:00', intentos: [], resultado: 'Busca la FVE del pedido OP 114 (Centro Clínico de Prueba)' },
      { id: 'cnk-0097', op: 'leer_fve', doc: 'FVE del 20 al 22 de octubre', estado: 'ok', intentos: [{ en: '2026-10-22 07:00', http: 200, msg: '3 FVE leídas; 1 corresponde a un pedido del sistema' }], resultado: 'FVE 26010 (dato de prueba) del pedido OP 113 · $29.750 · coincide con el RH (± $1)' },
      { id: 'cnk-0096', op: 'consultar_cartera', doc: 'Cartera de los clientes activos', estado: 'ok', intentos: [{ en: '2026-10-22 06:00', http: 200, msg: '13 clientes consultados' }], resultado: '2 clientes con facturas vencidas en Helisa: IPS Salud Vital y Consultorio Dr. Ramírez' },
      { id: 'cnk-0094', op: 'insertar_pedido', doc: 'OP 114', cliente: 'c-prueba-kg', estado: 'ok', intentos: [{ en: '2026-10-21 16:12', http: 423, msg: 'Error entre el web service y la base de datos', transitorio: true }, { en: '2026-10-21 16:17', http: 200, msg: 'Insertado' }], resultado: 'Pedido en Helisa: listo para facturar con F3' },
      { id: 'cnk-0093', op: 'insertar_pedido', doc: 'OP 113', cliente: 'c-prueba-fijo', estado: 'ok', intentos: [{ en: '2026-10-20 10:35', http: 200, msg: 'Insertado' }], resultado: 'Pedido en Helisa: listo para facturar con F3' },
      { id: 'cnk-0092', op: 'insertar_recibo', doc: `Recibo 35680 → ${fSon ? fSon.numero : 'FVE'}`, cliente: 'c-sonrisas', estado: 'ok', intentos: [{ en: '2026-10-20 09:15', http: 200, msg: 'Insertado (libros F y N)' }], resultado: `Cruza la ${fSon ? fSon.numero : 'FVE'}; recibo definitivo RC 8851` },
      { id: 'cnk-0091', op: 'insertar_recibo', doc: `Recibo 35686 → ${fPv ? fPv.numero : 'FVE'}`, cliente: 'c-pielviva', estado: 'error', intentos: [{ en: '2026-10-13 07:46', http: 400, codigo: 9, msg: 'Códigos de cruce inválidos' }], resultado: 'No se reintenta solo: hay que confirmar con Julio el formato del documento que se cruza (prefijo y número) y reenviar' },
      { id: 'cnk-0090', op: 'crear_cliente', doc: 'Droguería Nueva Esperanza', cliente: 'c-nueva', estado: 'bloqueado', intentos: [], resultado: 'No se envía: el cliente está pendiente de validar (falta el DV y la tarifa)' },
    ];
    cola.forEach((o) => { o.endpoint = OP_ENDPOINT[o.op]; o.etiqueta = OP_LABEL[o.op]; });
    const POLITICA = 'Errores transitorios (sin conexión, 423, 500): reintento automático a los 5, 15 y 60 minutos (máximo 3). Errores de datos (400 con código 5, 6, 7, 8 o 9; 401 firma): no se reintentan; quedan en «error» hasta corregir y reenviar.';
    const ERRORES_400 = { 3: 'Empresa inválida', 4: 'JSON inválido', 5: 'Ya existe', 6: 'Faltan campos obligatorios', 7: 'Datos incorrectos', 8: 'Débitos distintos de créditos', 9: 'Códigos de cruce inválidos' };
    const conekta = { ...CONEKTA, cola, OP_LABEL, OP_ENDPOINT, COLA_LABEL, POLITICA, ERRORES_400 };

    // ---------- modalidad 1B: octubre se envía por Conekta (simulado) ----------
    if (modalidad === '1B') {
      ['ap-op-2026-10-001', 'ap-op-2026-10-002'].forEach((id) => { const i = archivos_op.findIndex((a) => a.id === id); if (i >= 0) archivos_op.splice(i, 1); });
      const envios = { 'OP 113': { id: 'cnk-0093', en: '2026-10-20 10:35', respuesta: '200 · insertado' }, 'OP 114': { id: 'cnk-0094', en: '2026-10-21 16:17', respuesta: '200 · insertado (el primer intento respondió 423 y se reintentó solo)' } };
      pedidos.filter((x) => x.periodo === '2026-10').forEach((x) => { Object.assign(x, { via: 'conekta', archivo: null, estado: 'enviado', envio: envios[x.numero], importado_en: (envios[x.numero] || {}).en || null }); });
      const ped113 = pedidos.find((x) => x.numero === 'OP 113');
      if (ped113) {
        const cz = cierreCliente(ped113.cliente, ped113.periodo);
        facturas.push({ id: 'f-26010', numero: 'FVE 26010', cliente: ped113.cliente, periodo: ped113.periodo, fecha: '2026-10-21', vence: sumarDias('2026-10-21', 30), total: cz.factura.total, pagada_otro_medio: 0, pedido: ped113.numero, via_registro: 'conekta', registrada_por: 'Sistema (Helisa Conekta)', registrada_en: '2026-10-22 07:00', cufe: cufePrueba('FVE 26010'), cufe_prueba: true, dato_prueba: true, origen: 'Elaborada en Helisa llamando el pedido OP 113 (F3); leída por Helisa Conekta' });
        ped113.estado = 'facturado';
      }
      const iRc = archivos_plano.findIndex((a) => a.id === 'ap-rc-2026-10-001'); if (iRc >= 0) archivos_plano.splice(iRc, 1);
      const r80 = byId(recibos, 'r-35680'); if (r80) { r80.archivo = null; r80.envio_conekta = { id: 'cnk-0092', en: '2026-10-20 09:15', respuesta: '200 · insertado (libros F y N)' }; }
      const r86 = byId(recibos, 'r-35686'); if (r86) r86.envio_conekta = { id: 'cnk-0091', en: '2026-10-13 07:46', respuesta: '400 · código 9 · códigos de cruce inválidos', error: true };
      const cambia = {
        '2026-10-21 16:13': { en: '2026-10-21 16:17', quien: 'Sistema', accion: 'Envió el pedido OP 114 por Helisa Conekta', entidad: 'Pedidos · OP 114 · Centro Clínico de Prueba', detalle: 'El primer intento (16:12) respondió 423; el reintento automático fue aceptado (200)' },
        '2026-10-20 11:02': { en: '2026-10-20 10:35', quien: 'Sistema', accion: 'Envió el pedido OP 113 por Helisa Conekta', entidad: 'Pedidos · OP 113 · Consultorio de Prueba', detalle: '200 · insertado' },
        '2026-10-20 09:15': { en: '2026-10-20 09:15', quien: 'Sistema', accion: 'Envió el recibo 35680 por Helisa Conekta', entidad: 'Recibo de caja · Sonrisas del Caquetá', detalle: `Documento RC con libros F y N; cruza la ${fSon ? fSon.numero : 'FVE'}` },
      };
      auditoria.forEach((ev, i) => { if (cambia[ev.en]) auditoria[i] = cambia[ev.en]; });
      auditoria.push({ en: '2026-10-22 07:00', quien: 'Sistema', accion: 'Leyó la FVE 26010 por Helisa Conekta', entidad: 'Cierre · Consultorio de Prueba · Octubre 2026', detalle: 'Pedido OP 113 · $29.750 · coincide con el RH (dato de prueba)' });
      auditoria.push({ en: '2026-10-13 07:46', quien: 'Sistema', accion: 'Conekta rechazó el recibo 35686', entidad: 'Recibo de caja · Piel Viva', detalle: '400 · código 9 · códigos de cruce inválidos: corregir y reenviar' });
    }
    auditoria.sort((a, b) => b.en.localeCompare(a.en));

    // ---------- JSON de ejemplo para la cola (texto sin tildes: Conekta pide UTF-8 sin caracteres especiales) ----------
    function jsonPedido(ped) {
      const c = cliente(ped.cliente); const d = parseISO(ped.fecha);
      return { _nota: 'Nombres de campo ilustrativos: la estructura de set/order no es legible en la ayuda publica de Helisa (por confirmar)',
        order: { type: 'OP', number: String(ped.numero).replace(/\D/g, ''), date: { day: String(d.getDate()), month: String(d.getMonth() + 1), year: String(d.getFullYear()) }, idClient: c.nit, clientCode: (c.helisa && c.helisa.codigo_cliente) || PH('COD_CLIENTE'), idVendor: helisa.vendedor.identidad, priceList: helisa.lista_precio.codigo, costCenter: helisa.centro_costo.codigo, business: helisa.negocio.codigo,
          lines: lineasPedido(ped).map((l) => (l.tipo_concepto === 2 ? { conceptType: '2', conceptCode: l.codigo || PH(l.codigo_ph), description: textoTxt(l.concepto), quantity: numPlano(l.cantidad), unitValue: numPlano(l.unitario) } : { conceptType: '3', comment: textoTxt(l.texto) })) } };
    }
    function jsonRecibo(r) {
      const c = cliente(r.cliente); const d = parseISO(r.fecha);
      return { _nota: 'Campos tomados del ejemplo oficial de insercion de documentos (RC); cuentas del archivo de Julio (23 oct), las del libro N por confirmar',
        document: { date: { day: String(d.getDate()), month: String(d.getMonth() + 1), year: String(d.getFullYear()) }, document: { type: plantilla_rc.tipo_documento, number: String(r.consecutivo) } },
        transactions: movimientoRecibo(r).map((f) => ({ accountingClass: { value: f.clase === 'F' ? '0' : '1' }, nature: { tag: f.naturaleza }, account: f.cuenta, value: numPlano(f.valor), idThirdParty: c.nit, costCenter: plantilla_rc.centro_costo, concept: f.concepto,
          ...(f.cruce ? { accountingTransactionClient: { clientCode: (c.helisa && c.helisa.codigo_cliente) || PH('COD_CLIENTE'), affectDocument: { type: f.cruce.tipo, number: f.cruce.numero, quota: f.cruce.cuota } } } : {}) })) };
    }

    // ---------- avance de la facturación en Helisa (X de Y) ----------
    const PASO_LABEL = { sin_pedido: 'Sin pedido', por_importar: 'Pedido por importar', rechazado: 'Pedido rechazado', por_facturar: 'En Helisa · falta la FVE', registrada: 'FVE registrada', diferencia: 'FVE con diferencia' };
    const PASO_BADGE = { sin_pedido: 'plain', por_importar: 'warn', rechazado: 'danger', por_facturar: 'info', registrada: 'ok', diferencia: 'danger' };
    function pasoFacturacion(ped, f) {
      if (f) { const v = validacionFVE(f); return v && v.ok ? 'registrada' : 'diferencia'; }
      if (!ped) return 'sin_pedido';
      if (['importado', 'enviado', 'facturado'].includes(ped.estado)) return 'por_facturar';
      if (ped.estado === 'rechazado') return 'rechazado';
      return 'por_importar';
    }
    function avance(periodoId) {
      const filas = cierrePeriodo(periodoId).filter((cz) => cz.factura && cierreDe(cz.cliente.id, periodoId)).map((cz) => {
        const ped = pedidoDe(cz.cliente.id, periodoId); const f = facturaDe(cz.cliente.id, periodoId);
        return { c: cz.cliente, cz, ped, f, paso: pasoFacturacion(ped, f) };
      });
      const n = (k) => filas.filter((x) => x.paso === k).length;
      return { filas, total: filas.length, registradas: n('registrada') + n('diferencia'), ok: n('registrada'), diferencia: n('diferencia'), por_facturar: n('por_facturar'), por_importar: n('por_importar'), sin_pedido: n('sin_pedido'), rechazado: n('rechazado') };
    }

    // ---------- pendientes hacia Helisa (inicio del panel) ----------
    function pendientesHelisa() {
      const out = [];
      archivos_op.filter((a) => ['generado', 'descargado'].includes(a.estado)).forEach((a) => out.push({ nivel: 'warn', titulo: `Archivo de pedidos ${a.nombre} sin importar en Helisa`, sub: `${a.pedidos} pedido${a.pedidos === 1 ? '' : 's'} · descargado el ${fmtFechaCorta(a.descargado_en || a.generado_en)} ${String(a.descargado_en || a.generado_en).slice(11)}`, href: `planos.html#${a.id}`, accion: 'Ver archivo' }));
      pedidos.filter((x) => ['importado', 'enviado'].includes(x.estado) && !facturaDe(x.cliente, x.periodo)).forEach((x) => out.push({ nivel: 'info', titulo: `Pedido ${x.numero} en Helisa: falta elaborar y registrar la FVE`, sub: `${cliente(x.cliente).nombre_comercial} · total esperado ${fmtCOP(cierreCliente(x.cliente, x.periodo).factura.total)}`, href: `cierre.html#${x.periodo}|${x.cliente}`, accion: 'Registrar FVE' }));
      const sinPed = cierres_cliente.filter((x) => !pedidoDe(x.cliente, x.periodo) && byId(periodos, x.periodo).estado === 'abierto');
      if (sinPed.length) out.push({ nivel: 'warn', titulo: `${sinPed.length} cierre${sinPed.length === 1 ? '' : 's'} de hoy sin pedido para Helisa`, sub: sinPed.map((x) => `${cliente(x.cliente).nombre_comercial} · RH ${x.rh}`).join(' · '), href: 'planos.html#op', accion: modalidad === '1B' ? 'Enviar por Conekta' : 'Generar pedidos' });
      recibos.filter((r) => r.estado === 'entregado' && !r.archivo).forEach((r) => out.push(r.envio_conekta && r.envio_conekta.error
        ? { nivel: 'danger', titulo: `Conekta rechazó el recibo ${r.consecutivo}`, sub: `${cliente(r.cliente).nombre_comercial} · ${r.envio_conekta.respuesta}`, href: 'planos.html#conekta', accion: 'Ver la cola' }
        : { nivel: 'info', titulo: `Recibo ${r.consecutivo} entregado: falta el archivo RC`, sub: `${cliente(r.cliente).nombre_comercial} · ${fmtCOP(r.valor)}`, href: 'planos.html#rc', accion: 'Generar RC' }));
      return out;
    }

    // ---------- estados y fichas de color (las mismas en todas las páginas de la propuesta 1) ----------
    const ESTADO_LABEL = { generado: 'Generado', descargado: 'Descargado', enviado: 'Enviado por Conekta', importado: 'Importado en Helisa', facturado: 'Facturado', rechazado: 'Rechazado por Helisa', anulado: 'Anulado', ...COLA_LABEL };
    const ESTADO_BADGE = { generado: 'warn', descargado: 'info', enviado: 'ok', importado: 'ok', facturado: 'ok', rechazado: 'danger', anulado: 'plain', ok: 'ok', en_cola: 'info', enviando: 'info', reintento: 'warn', error: 'danger', bloqueado: 'warn', programada: 'plain' };

    // ---------- trazabilidad de la propuesta 1 ----------
    const T = traza;
    T.textos.intro = 'Siga cada servicio desde la visita en campo hasta el cruce del pago en Helisa: constancias, cierre, planilla RH, pedido (archivo OP o envío por Conekta), FVE elaborada en Helisa y registrada en el sistema, recibos de caja, movimiento contable del recibo y cruce. Cada eslabón guarda estado, fecha y hora, usuario, documento y huella; lo que falta se ve punteado.';
    T.textos.modalidad = modalidad === '1B' ? 'Propuesta 1 · modalidad 1B (Helisa Conekta, simulada desde el 1 de octubre)' : 'Propuesta 1 · modalidad 1A (archivos planos)';
    const nc = (s) => String(s || '').split(' ').slice(0, 2).join(' ');
    const lineasTexto = (ped) => lineasPedido(ped).filter((l) => l.tipo_concepto === 2).map((l) => `${l.codigo ? 'código ' + l.codigo + ' · ' : ''}${l.concepto} (${numPlano(l.cantidad)} × ${fmtCOP(l.unitario)})`).join(' + ') + ' + 2 líneas de comentario';
    const detalleHelisa = (x) => [['Código del cliente en Helisa', x.c.helisa.codigo_cliente ? `${x.c.helisa.codigo_cliente} (${x.c.helisa.codigo_estado === 'prueba' ? 'de prueba' : x.c.helisa.codigo_estado})` : 'Falta: no se exporta'], ['Lista · centro de costo · negocio · vendedor', `${x.c.helisa.lista_precio || '—'} ${(listaPrecio(x.c.helisa.lista_precio) || {}).nombre || ''} (por confirmar) · ${helisa.centro_costo.codigo} · vacío · ${helisa.vendedor.identidad}`]];
    T.constructores.pedido = function (x) {
      const ped = x.pedido;
      if (!ped) return x.cierre && x.cz.factura ? { estado: 'pendiente', numero: 'Sin pedido', sub: modalidad === '1B' && x.p.id >= '2026-10' ? 'Falta enviar el pedido por Conekta' : 'Falta generar el archivo de pedidos (OP)', enlace: { href: 'planos.html#op', texto: 'Ir a Helisa: pedidos y recibos' } } : null;
      const val = validarPedido(ped); const vista = { nombre: `Vista del pedido ${ped.numero} (pedido OP de 24 columnas y cuadrícula)`, numero: ped.numero, fecha: ped.generado_en, hash: hashFake('pedido|' + ped.numero), href: `../documentos/pedido.html#${ped.archivo || ped.numero.replace(' ', '-')}` };
      if (ped.via === 'conekta') {
        const e = ped.envio || {}; const op = cola.find((o) => o.id === e.id) || { intentos: [] };
        return {
          estado: ['enviado', 'facturado', 'importado'].includes(ped.estado) ? 'ok' : (ped.estado === 'rechazado' ? 'alerta' : 'curso'), numero: ped.numero, sub: 'Enviado por Helisa Conekta (set/order)',
          aviso: op.intentos.length > 1 ? `El primer intento respondió ${op.intentos[0].http} (${op.intentos[0].msg}); el reintento automático fue aceptado.` : '', nivel_aviso: 'info',
          fecha: e.en, usuario: 'Sistema', hash: hashFake('conekta|' + ped.numero + '|' + e.en),
          docs: [{ nombre: `Envío por Conekta del pedido ${ped.numero}`, numero: e.id, fecha: e.en, hash: hashFake('conekta|' + ped.numero + '|' + e.en), href: 'planos.html#conekta' }, vista],
          detalle: [['Modalidad', '1B · Helisa Conekta (simulado)'], ['Respuesta', e.respuesta || '—'], ['Líneas', lineasTexto(ped)], ['Subtotal del pedido', `${fmtCOP(val.subtotal)} = subtotal del RH`], ...detalleHelisa(x)],
          enlace: { href: 'planos.html#conekta', texto: 'Ver la cola de Conekta' }, buscar: [e.id || ''],
          eventos: op.intentos.map((it) => ({ en: it.en, quien: 'Sistema', accion: it.http === 200 ? `Insertó el pedido ${ped.numero} por Conekta` : `Conekta respondió ${it.http} al pedido ${ped.numero}`, detalle: it.http === 200 ? it.msg : `${it.msg} · reintento automático`, nivel: it.http === 200 ? 'ok' : 'curso' })),
        };
      }
      const a = archivos_op.find((y) => y.id === ped.archivo) || {};
      const rech = (ped.historial || []).filter((hh) => hh.estado === 'rechazado');
      const estado = ['importado', 'facturado'].includes(ped.estado) ? 'ok' : (ped.estado === 'rechazado' ? 'alerta' : 'curso');
      const eventos = [];
      rech.forEach((hh) => { const ar = archivos_op.find((y) => y.id === hh.archivo) || {}; eventos.push({ en: ar.generado_en, quien: nc(ar.generado_por), accion: `Generó el archivo de pedidos ${ar.nombre}`, nivel: 'ok' }, { en: hh.en, quien: nc(ar.generado_por), accion: `Helisa rechazó el archivo ${ar.nombre}`, detalle: hh.detalle, nivel: 'alerta' }); });
      eventos.push({ en: a.generado_en, quien: nc(a.generado_por), accion: `Generó el pedido ${ped.numero} en el archivo ${a.nombre}`, detalle: `${lineasPedido(ped).length} líneas · subtotal ${fmtCOP(val.subtotal)}`, nivel: 'ok' });
      if (a.descargado_en) eventos.push({ en: a.descargado_en, quien: nc(a.generado_por), accion: `Descargó el archivo ${a.nombre}`, nivel: 'ok' });
      if (a.importado_en) eventos.push({ en: a.importado_en, quien: nc(a.importado_por), accion: 'Lo importó en Helisa (Importación de pedidos)', nivel: 'ok' });
      return {
        estado, alerta: rech.some((hh) => hh.propio), numero: ped.numero,
        sub: estado === 'ok' ? 'Archivo importado en Helisa' : `${ESTADO_LABEL[a.estado] || ped.estado} · falta importarlo en Helisa`,
        aviso: rech.length ? `El archivo ${(archivos_op.find((y) => y.id === rech[0].archivo) || {}).nombre} fue rechazado: ${rech[0].detalle}. Se regeneró.` : '', nivel_aviso: rech.some((hh) => hh.propio) ? 'alerta' : 'info',
        fecha: a.importado_en || a.descargado_en || a.generado_en, usuario: nc(a.importado_por || a.generado_por), hash: a.sha256,
        docs: [{ nombre: `Archivo de pedidos ${a.nombre}`, numero: a.nombre, fecha: a.generado_en, hash: a.sha256, href: `planos.html#${a.id}`, estado: a.estado, nota: `${a.pedidos} pedido${a.pedidos === 1 ? '' : 's'} · pedido OP oficial (24 columnas, .xlsx)` }, vista, ...rech.map((hh) => { const ar = archivos_op.find((y) => y.id === hh.archivo) || {}; return { nombre: `Archivo rechazado ${ar.nombre}`, numero: ar.nombre, fecha: ar.generado_en, hash: ar.sha256, href: `planos.html#${ar.id}`, estado: 'rechazado' }; })],
        detalle: [['Modalidad', '1A · archivo plano (pedido OP de 24 columnas con fila de títulos, .xlsx; Excel de Julio, 23 oct)'], ['Líneas', lineasTexto(ped)], ['Subtotal del pedido', `${fmtCOP(val.subtotal)} ${Math.abs(val.subtotal - (val.rh || 0)) <= 1 ? '= subtotal del RH' : '≠ subtotal del RH'}`], ...detalleHelisa(x)],
        enlace: { href: `planos.html#${a.id}`, texto: 'Ver el archivo de pedidos' },
        buscar: [a.nombre, ...rech.map((hh) => (archivos_op.find((y) => y.id === hh.archivo) || {}).nombre)],
        eventos,
      };
    };
    const baseFve = T.constructores.fve;
    T.constructores.fve = function (x) {
      const f = x.factura;
      if (!f) {
        if (!x.pedido) return null;
        if (['importado', 'enviado'].includes(x.pedido.estado)) return { estado: 'pendiente', numero: 'Sin FVE', sub: `Falta registrar la FVE: se elabora en Helisa llamando el pedido ${x.pedido.numero} (F3)`, aviso: modalidad === '1B' ? 'Con Conekta la FVE se lee sola en la siguiente lectura programada; también se puede importar el listado de Helisa o digitarla.' : 'Se registra por el listado exportado de Helisa o digitándola en el cierre; con la modalidad 1B se lee sola por Conekta.', nivel_aviso: 'info', detalle: [['Total esperado (RH)', fmtCOP(x.cz.factura.total)], ['Validación', 'Al registrarla se compara con el RH (± $1)']], enlace: { href: `cierre.html#${x.p.id}|${x.c.id}`, texto: 'Registrar la FVE en el cierre' } };
        return { estado: 'pendiente', numero: 'Sin FVE', sub: 'Primero hay que importar el pedido en Helisa' };
      }
      const e = baseFve(x);
      e.aviso = 'La factura la elabora Lucrecia en Helisa, una a una, llamando el pedido (F3); Helisa calcula el IVA, la contabiliza y la envía a la DIAN.'; e.nivel_aviso = 'info';
      if (f.via_registro === 'conekta') { e.usuario = 'Sistema'; e.eventos = e.eventos.map((ev) => (ev.quien !== 'Helisa' ? { ...ev, quien: 'Sistema (Conekta)', accion: `Leyó la ${f.numero} por Helisa Conekta y la registró` } : ev)); }
      if (f.dato_prueba) e.sub += ' · dato de prueba';
      e.enlace = { href: `cierre.html#${x.p.id}|${x.c.id}`, texto: 'Ver en el cierre' };
      return e;
    };
    T.constructores.rc = function (x) {
      const f = x.factura; if (!f) return null;
      if (!x.validos.length) return f.pagada_otro_medio ? { estado: 'na', numero: 'No aplica', sub: 'El pago se registró directamente en Helisa' } : null;
      const conA = x.validos.filter((r) => r.archivo); const conK = x.validos.filter((r) => r.envio_conekta && !r.archivo);
      if (conK.length) {
        const r = conK[conK.length - 1]; const e = r.envio_conekta; const h = hashFake('conekta|' + r.id + '|' + e.en);
        const base = { detalle: [['Contenido', `Débito a caja, crédito a cartera 1305 que cruza la ${f.numero}`], ['Libros', 'F y N (accountingClass 0 y 1 en el JSON)'], ['Tipo de recibo en Helisa', `${plantilla_rc.tipo_documento} (archivo de Julio; confirmar si equivale a RC1 o RC2)`], ['Respuesta', e.respuesta]], enlace: { href: 'planos.html#conekta', texto: e.error ? 'Corregir en la cola de Conekta' : 'Ver la cola de Conekta' }, buscar: [e.id] };
        if (e.error) return { ...base, estado: 'alerta', alerta: true, numero: `Recibo ${r.consecutivo} · error`, sub: 'Conekta lo rechazó: corregir y reenviar', aviso: `Respuesta ${e.respuesta}. No se reintenta solo.`, nivel_aviso: 'alerta', fecha: e.en, usuario: 'Sistema', eventos: [{ en: e.en, quien: 'Sistema', accion: `Conekta rechazó el recibo ${r.consecutivo}`, detalle: e.respuesta, nivel: 'alerta' }] };
        return { ...base, estado: 'ok', numero: `Conekta ${e.id}`, sub: 'Recibo insertado por API (set/document)', fecha: e.en, usuario: 'Sistema', hash: h, docs: [{ nombre: `Movimiento contable del recibo ${r.consecutivo} enviado por Conekta`, numero: e.id, fecha: e.en, hash: h, href: 'planos.html#conekta' }], eventos: [{ en: e.en, quien: 'Sistema', accion: `Envió el recibo ${r.consecutivo} por Helisa Conekta`, detalle: e.respuesta, nivel: 'ok' }] };
      }
      if (!conA.length) return { estado: 'pendiente', numero: 'Sin archivo', sub: `Falta generar el archivo RC (${x.validos.length} recibo${x.validos.length > 1 ? 's' : ''} ${x.validos.map((r) => (ESTADO_RECIBO_LABEL[r.estado] || r.estado).toLowerCase()).join(', ')})`, enlace: { href: 'planos.html#rc', texto: 'Generar el archivo RC' } };
      const a = archivos_plano.find((y) => y.id === conA[conA.length - 1].archivo) || {};
      const filas = a.id ? filasArchivoRC(a) : []; const cu = cuadreRC(filas);
      return {
        estado: a.estado === 'importado' ? 'ok' : 'curso', numero: a.nombre ? a.nombre.replace(/^COMSERVA_|\.(xlsx|xls|csv|txt)$/g, '').replace(/_/g, ' ') : 'Archivo RC', sub: `${ESTADO_PLANO_LABEL[a.estado] || ''} · movimiento contable`,
        fecha: a.importado_en || a.generado_en, usuario: nc(a.importado_por || a.generado_por), hash: a.sha256,
        docs: [{ nombre: `Archivo de movimiento contable ${a.nombre}`, numero: a.nombre, fecha: a.generado_en, hash: a.sha256, href: `planos.html#${a.id}`, estado: a.estado, nota: `${a.documentos} recibo${a.documentos === 1 ? '' : 's'} · ${filas.length} líneas` }],
        detalle: [['Contenido', `Recibo RC de 4 filas: caja F 11050501 y N 111050501 al débito, cartera F 13050501 y N 112050501 al crédito; la cartera F cruza la ${f.numero} (tipo, número y cuota del documento que afecta)`], ['Cuadre', `Libro F ${fmtCOP(cu.F.D)} = ${fmtCOP(cu.F.C)} · libro N ${fmtCOP(cu.N.D)} = ${fmtCOP(cu.N.C)}`], ['Libros', 'F y N (Excel de Julio, 23 oct); cuentas del libro N por confirmar con el contador'], ['Tipo de recibo en Helisa', `${plantilla_rc.tipo_documento} (archivo de Julio; confirmar si equivale a RC1 o RC2)`]],
        enlace: { href: `planos.html#${a.id}`, texto: 'Ver el archivo RC' }, buscar: [a.nombre || ''],
        eventos: [{ en: a.generado_en, quien: nc(a.generado_por), accion: `Generó el archivo ${a.nombre}`, detalle: `${filas.length} filas (4 por recibo) en los libros F y N`, nivel: 'ok' }, ...(a.importado_en ? [{ en: a.importado_en, quien: nc(a.importado_por), accion: 'Lo importó en Helisa (Importación de movimiento contable, módulo de cartera)', nivel: 'ok' }] : [])],
      };
    };

    const baseCruce = T.constructores.cruce;
    T.constructores.cruce = function (x) {
      const e = baseCruce(x);
      if (e && e.estado === 'pendiente' && x.validos.some((r) => r.envio_conekta && !r.archivo)) e.sub = 'Falta que Conekta inserte el recibo (corregir y reenviar) y registrar el recibo definitivo';
      return e;
    };

    return {
      modalidad, MODALIDADES, setModalidad, CONEKTA, conekta,
      plantilla_op, plantilla_rc, CAMPOS_OP, COLUMNAS_RC, COD_PH, PH, esPH, numPlano, textoTxt, pad8,
      lineasPedido, camposLinea, validarPedido, pedidosDeArchivo, filasArchivoOP, txtFilas, txtArchivoOP,
      recibosDeArchivo, movimientoRecibo, camposRC, filasArchivoRC, csvArchivoRC, cuadreRC,
      jsonPedido, jsonRecibo, avance, pasoFacturacion, PASO_LABEL, PASO_BADGE, pendientesHelisa, ESTADO_LABEL, ESTADO_BADGE,
    };
  })();

  // Barra superior común de los mockups
  // v6: cada propuesta cambia DATA.mock.propuesta (p. ej. 'PROPUESTA 1') y la barra lo muestra
  const mock = { version: 'V6', propuesta: 'PROPUESTA 1 · ' + p1.modalidad };
  function mockBar(active) {
    const links = [
      ['../index.html', 'Inicio'],
      ['../app/index.html', 'App móvil'],
      ['../panel/index.html', 'Panel web'],
      ['../panel/trazabilidad.html', 'Trazabilidad'],
      ['../documentos/index.html', 'Documentos PDF'],
      ['../portal/index.html', 'Portal (C1)'],
    ];
    return `<div class="mock-bar no-print"><span class="tag">MOCKUP · ${mock.version} · ${mock.propuesta}</span><span>RH digital Comserva · datos de prueba · hoy: ${fmtFecha(HOY, { dia: true })}</span><span class="spacer"></span><nav>${links.map(([h, t]) => `<a href="${h}"${t === active ? ' style="color:#fff;font-weight:700;text-decoration:underline"' : ''}>${t}</a>`).join('')}</nav></div>`;
  }

  return {
    HOY, empresa, parametros, dispositores, categorias, operarios, vehiculos, usuarios, clientes, periodos, visitas, ruta_hoy, recibos, actas, auditoria,
    facturas, plantillas_plano, archivos_plano, CAMPOS_PLANO, COLUMNAS_HELISA, colsHelisa,
    ROL_LABEL, FRECUENCIA_LABEL, CARTERA_LABEL, ESTADO_VISITA_LABEL, TIPO_RECIBO_LABEL, ESTADO_RECIBO_LABEL, ESTADO_PLANO_LABEL, ESTADO_CIERRE_LABEL, MESES, DIAS,
    factura, facturaDe, saldoReferencia, facturasConSaldo, clienteTieneFactura, plantillaVigente, estadoCierre, generarPlano, textoArchivo, sumarDias,
    fmtCOP, fmtKg, fmtNum, fmtFecha, fmtFechaCorta, fmtMes, cap, parseISO, byId, cliente, operario, categoria, dispositor, nitCompleto, iniciales,
    tarifaVigente, totalKg, visitasDe, totalizar, calcularFactura, cierreCliente, cierrePeriodo, numeroALetras, firmaSVG, qrSVG, hashFake, consecutivoPlanilla, pad, mockBar,
    // v6 · base común
    mock, r2, ESQUEMA_TARIFA_LABEL, ESQUEMA_TARIFA_CORTO, fraseLiquidacion, tarifaResumen, helisa, equivalencias_helisa, equivalencia, LISTAS_PRECIO_HELISA, CARTILLA_HELISA, listaPrecio,
    cierres_cliente, cierreAnticipado, cierreDe, numeroRH, pedidos, pedidoDe, archivos_op, ESTADO_PEDIDO_LABEL, VIA_REGISTRO_LABEL, validacionFVE,
    facturas_referencia, pruebaReferencia, traza,
    // propuesta 1
    p1, cierres_anticipados: cierres_cliente,
  };
})();
