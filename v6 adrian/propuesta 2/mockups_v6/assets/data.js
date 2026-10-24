/* =====================================================================
   RH digital Comserva · datos de prueba compartidos por todos los mockups
   -------------------------------------------------------------------
   v6 · PROPUESTA 2 · RH digital con facturación electrónica.
   Parte de la base común de las dos propuestas y agrega la Fase 2: el
   sistema emite la factura electrónica por un proveedor tecnológico
   (SIMULADO), con el prefijo de PRUEBA «RHD» y CUFE ficticios; Helisa queda
   para la contabilidad (movimiento contable de facturas, notas y recibos).
   Septiembre de 2026 se muestra ya facturado por el sistema (RHD 1 a 12):
   la RHD 1 de Cofema tiene el mismo contenido y total que la FVE 25756 real.
   Los datos de Cofema (septiembre de 2026) son los reales del formulario RHPS
   en papel, el acta 25676 y la factura FVE 25756; en el sistema su RH es el 22690-26. Las cifras del esquema
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
    gerente: 'Diego', // persona real: solo el nombre de pila
    bancos: 'Davivienda cta. corriente ••••9147 · Bancolombia ahorros ••••0391', // enmascaradas: el número completo no se publica
  };

  const parametros = {
    dia_corte: 26,
    iva_pct: 19,
    formato_planilla: '{n}-{yy}',
    siguiente_planilla: 22708, // v6: 22702-26 y 22703-26 (20 y 21 oct) y, en la propuesta 2, 22704-26 a 22707-26 (cierres anticipados de hoy)
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

  // Personas reales del equipo de Comserva: solo nombre de pila; la cédula y el teléfono se toman de la ficha real (no se publican).
  const operarios = [
    { id: 'op-dubeny', nombre: 'Dubeny', documento: '', cargo: 'Conductor', telefono: '', usuario: 'dubeny', activo: true, dispositivo: 'Samsung Galaxy A35 · Android 15', rango_constancias: { desde: 1151, hasta: 1200, siguiente: 1189 }, rango_recibos: { desde: 35671, hasta: 35700, siguiente: 35688 } },
    { id: 'op-jesus', nombre: 'Jesús', documento: '', cargo: 'Auxiliar', telefono: '', usuario: 'jesus', activo: true, dispositivo: 'Xiaomi Redmi Note 13 · Android 14', rango_constancias: { desde: 1201, hasta: 1250, siguiente: 1210 }, rango_recibos: { desde: 35701, hasta: 35730, siguiente: 35703 } },
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
    // Cliente FICTICIO (reemplaza en las dos propuestas al cliente real que se usó antes): droguería persona jurídica de Morelia.
    { id: 'c-trebol', nit: '900555017', dv: '1', razon_social: 'Droguería y Papelería El Trébol', nombre_comercial: 'El Trébol', sede: 'Local principal', direccion: 'Carrera 3 N.º 8-15', ciudad: 'Morelia', departamento: 'Caquetá', contacto: 'Administración', telefono: '300 000 0017', whatsapp: '300 000 0017', email: 'eltrebol@example.com', frecuencia: 'quincenal', dia_visita: 'Miércoles', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2026-08-14',
      tarifas: [{ desde: '2026-08-14', hasta: null, basico: 55000, kg_incluidos: 8, precio_kg: 4200, iva_pct: 19, plazo: '10 primeros días del mes siguiente', nota: 'Según contrato del 14 ago 2026' }] },
    { id: 'c-saludvital', nit: '901233845', dv: '7', razon_social: 'IPS Salud Vital Florencia S.A.S.', nombre_comercial: 'IPS Salud Vital', sede: 'Sede Centro', direccion: 'Carrera 11 N.º 14-30', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Jefe de enfermería', telefono: '300 000 0011', whatsapp: '300 000 0011', email: 'calidad.saludvital@example.com', frecuencia: 'semanal', dia_visita: 'Lunes', estado: 'activo', cartera: 'en_mora', cartera_fuente: 'Excel Helisa 17 oct', creado: '2023-05-10',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 120000, kg_incluidos: 30, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-labamazonia', nit: '900876120', dv: '3', razon_social: 'Laboratorio Clínico Amazonía Ltda.', nombre_comercial: 'Laboratorio Amazonía', sede: 'Sede única', direccion: 'Calle 16 N.º 8-45, Barrio Juan XXIII', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Bacterióloga coordinadora', telefono: '300 000 0012', whatsapp: '300 000 0012', email: 'laboratorio.amazonia@example.com', frecuencia: 'quincenal', dia_visita: 'Martes', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2024-09-15',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 65000, kg_incluidos: 10, precio_kg: 4800, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-sonrisas', nit: '1000000029', dv: '4', razon_social: 'Odontología Sonrisas del Caquetá', nombre_comercial: 'Sonrisas del Caquetá', sede: 'Consultorio', direccion: 'Carrera 9 N.º 12-18, oficina 201', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Dra. Patricia', telefono: '300 000 0013', whatsapp: '300 000 0013', email: 'sonrisascaqueta@example.com', frecuencia: 'mensual', dia_visita: 'Primer jueves', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Manual', creado: '2025-03-02',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 48000, kg_incluidos: 6, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-economia', nit: '1000000452', dv: '7', razon_social: 'Droguería La Economía de Morelia', nombre_comercial: 'Droguería La Economía', sede: 'Local', direccion: 'Calle 5 N.º 3-10, parque principal', ciudad: 'Morelia', departamento: 'Caquetá', contacto: 'Don Arnulfo', telefono: '300 000 0014', whatsapp: '300 000 0014', email: '', frecuencia: 'mensual', dia_visita: 'Tercer viernes', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Recibo de caja', creado: '2025-11-20',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 45000, kg_incluidos: 6, precio_kg: 4000, iva_pct: 19, plazo: 'Paga en efectivo en la visita', nota: 'Paga en efectivo' }] },
    { id: 'c-huellas', nit: '900654321', dv: '0', razon_social: 'Veterinaria Huellas Felices S.A.S.', nombre_comercial: 'Veterinaria Huellas', sede: 'Clínica veterinaria', direccion: 'Avenida Circunvalar N.º 20-55', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Dr. Mauricio', telefono: '300 000 0015', whatsapp: '300 000 0015', email: 'huellasfelicesvet@example.com', frecuencia: 'quincenal', dia_visita: 'Jueves', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2024-06-11',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 52000, kg_incluidos: 8, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: 'Genera residuos de animales (categoría sin tratamiento definido)' }] },
    { id: 'c-pielviva', nit: '1000000098', dv: '2', razon_social: 'Centro de Estética Piel Viva', nombre_comercial: 'Piel Viva', sede: 'Local', direccion: 'Calle 19 N.º 10-77', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Yurany', telefono: '300 000 0016', whatsapp: '300 000 0016', email: 'pielvivaestetica@example.com', frecuencia: 'mensual', dia_visita: 'Segundo lunes', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Recibo de caja', creado: '2026-02-09',
      tarifas: [{ desde: '2026-02-09', hasta: null, basico: 42000, kg_incluidos: 5, precio_kg: 4600, iva_pct: 19, plazo: 'Paga en efectivo en la visita', nota: 'Paga en efectivo' }] },
    { id: 'c-visionsur', nit: '900334876', dv: '4', razon_social: 'Clínica Oftalmológica Visión Sur S.A.S.', nombre_comercial: 'Visión Sur', sede: 'Sede principal', direccion: 'Carrera 14 N.º 7-90', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Coordinación de calidad', telefono: '300 000 0018', whatsapp: '300 000 0018', email: 'calidad.visionsur@example.com', frecuencia: 'semanal', dia_visita: 'Viernes', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2023-01-18',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 95000, kg_incluidos: 20, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-tinta', nit: '1000000120', dv: '7', razon_social: 'Estudio de Tatuajes Tinta Negra', nombre_comercial: 'Tinta Negra', sede: 'Estudio', direccion: 'Calle 13 N.º 11-04', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Kevin', telefono: '300 000 0019', whatsapp: '300 000 0019', email: '', frecuencia: 'mensual', dia_visita: 'Último martes', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Recibo de caja', creado: '2026-05-05',
      tarifas: [{ desde: '2026-05-05', hasta: null, basico: 40000, kg_incluidos: 4, precio_kg: 4600, iva_pct: 19, plazo: 'Paga en efectivo en la visita', nota: 'Paga en efectivo' }] },
    { id: 'c-ramirez', nit: '1000000330', dv: '7', razon_social: 'Consultorio Médico Dr. Ramírez', nombre_comercial: 'Consultorio Dr. Ramírez', sede: 'Consultorio', direccion: 'Carrera 8 N.º 15-61', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Secretaria', telefono: '300 000 0020', whatsapp: '300 000 0020', email: 'consultorioramirez@example.com', frecuencia: 'mensual', dia_visita: 'Primer miércoles', estado: 'activo', cartera: 'en_mora', cartera_fuente: 'Excel Helisa 17 oct', creado: '2022-08-30',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 46000, kg_incluidos: 6, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-olivos', nit: '900128790', dv: '1', razon_social: 'Funeraria Los Olivos del Caquetá S.A.S.', nombre_comercial: 'Funeraria Los Olivos', sede: 'Sala de tanatopraxia', direccion: 'Calle 21 N.º 6-14', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Administrador', telefono: '300 000 0021', whatsapp: '300 000 0021', email: 'losolivoscaqueta@example.com', frecuencia: 'quincenal', dia_visita: 'Sábado', estado: 'activo', cartera: 'al_dia', cartera_fuente: 'Excel Helisa 17 oct', creado: '2024-11-03',
      tarifas: [{ desde: '2026-01-01', hasta: null, basico: 60000, kg_incluidos: 10, precio_kg: 4600, iva_pct: 19, plazo: 'Crédito 30 días', nota: '' }] },
    { id: 'c-nueva', nit: '1000000340', dv: '', razon_social: 'Droguería Nueva Esperanza', nombre_comercial: 'Droguería Nueva Esperanza', sede: 'Local', direccion: 'Barrio Las Malvinas, manzana C casa 12', ciudad: 'Florencia', departamento: 'Caquetá', contacto: 'Doña Rosalba', telefono: '300 000 0022', whatsapp: '300 000 0022', email: '', frecuencia: 'mensual', dia_visita: '', estado: 'pendiente_validar', existe_en_helisa: false, cartera: 'sin_info', cartera_fuente: '', creado: '2026-10-16', creado_por: 'Dubeny (en campo)',
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
  // Valores vistos en la Helisa de Comserva el 21 de octubre: lista de precio 2 «BASICA 30000»,
  // centro de costo 0101 FLORENCIA, negocio 1 COMSERVA, vendedor 828002730 COMSERVA.
  // Los CÓDIGOS de concepto no se vieron: van «por confirmar» hasta que Julio entregue la cartilla.
  // ---------------------------------------------------------------------
  const helisa = {
    version: '4.12.2.0 (TSplus, helisacloud.com)',
    lista_precio: { codigo: '2', nombre: 'BASICA 30000', estado: 'visto' },
    centro_costo: { codigo: '0101', nombre: 'FLORENCIA', estado: 'visto' },
    negocio: { codigo: '1', nombre: 'COMSERVA', estado: 'visto' },
    vendedor: { identidad: '828002730', nombre: 'COMSERVA', estado: 'visto' },
    bodega: { codigo: '', nombre: 'Múltiples bodegas', estado: 'por confirmar' },
    tipo_pedido: { codigo: '', nombre: 'Pedido (no habilitado aún en la Helisa de Comserva)', estado: 'por confirmar' },
    tipo_recibo: { codigo: 'RC1 o RC2', nombre: 'Recibo de caja', estado: 'por confirmar' },
    tipo_factura: { codigo: 'FVE', nombre: 'Factura de venta electrónica', estado: 'visto' },
  };
  // Componente de la tarifa → concepto de Helisa. tipo_concepto: 2 = servicio, 3 = comentario (visto en el pedido de otra empresa).
  const equivalencias_helisa = [
    { componente: 'basico', etiqueta: 'Servicio básico mensual', tipo_concepto: 2, codigo_concepto: '', nombre_concepto: 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS', lista_precio: '2', estado: 'por confirmar', cantidad: '1', unitario: 'Básico de la tarifa' },
    { componente: 'kg_adicionales', etiqueta: 'Kilos adicionales', tipo_concepto: 2, codigo_concepto: '', nombre_concepto: 'KILOGRAMOS ADICIONALES', lista_precio: '2', estado: 'por confirmar', cantidad: 'Kilos adicionales', unitario: 'Precio del kilo adicional' },
    { componente: 'kg_todos', etiqueta: 'Solo por kilo', tipo_concepto: 2, codigo_concepto: '', nombre_concepto: 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS', lista_precio: '2', estado: 'por confirmar', cantidad: 'Kilos del periodo', unitario: 'Precio del kilo' },
    { componente: 'fijo', etiqueta: 'Cobro fijo mensual', tipo_concepto: 2, codigo_concepto: '', nombre_concepto: 'Concepto del cobro fijo (por confirmar)', lista_precio: '2', estado: 'por confirmar', cantidad: '1', unitario: 'Valor fijo' },
    { componente: 'comentario', etiqueta: 'Línea de comentario', tipo_concepto: 3, codigo_concepto: '', nombre_concepto: 'SERVICIO ESPECIAL DE ASEO PRESTADO MES DE {MES} {AÑO}', lista_precio: '', estado: 'visto en la FVE 25997', cantidad: '', unitario: '' },
    // Alternativa por confirmar con Julio: un concepto por categoría en kilos (se vieron en el catálogo de conceptos)
    { categoria: 'BIO', etiqueta: 'Biológicos', tipo_concepto: 2, codigo_concepto: '', nombre_concepto: 'BIOLÓGICOS (KILOGRAMOS)', lista_precio: '2', estado: 'por confirmar (alternativa)' },
    { categoria: 'ANATO', etiqueta: 'Anatomopatológicos', tipo_concepto: 2, codigo_concepto: '', nombre_concepto: 'ANATOMOPATOLÓGICOS (KILOGRAMOS)', lista_precio: '2', estado: 'por confirmar (alternativa)' },
    { categoria: 'ANIMAL', etiqueta: 'Animales', tipo_concepto: 2, codigo_concepto: '', nombre_concepto: 'ANIMALES (KILOGRAMOS)', lista_precio: '2', estado: 'por confirmar (alternativa)' },
    { categoria: 'CORTO', etiqueta: 'Cortopunzantes', tipo_concepto: 2, codigo_concepto: '', nombre_concepto: 'Por confirmar (¿BIOSANITARIOS (KILOGRAMOS)?)', lista_precio: '2', estado: 'por confirmar (alternativa)' },
  ];
  const equivalencia = (componente) => equivalencias_helisa.find((e) => e.componente === componente) || null;

  // Código del cliente en Helisa (el «código adicional» cuando el mismo NIT se crea varias veces, p. ej. por sede)
  // y campos fiscales OPCIONALES (obligatorios solo si se factura electrónicamente desde el sistema, propuesta 2).
  // Los códigos son DE PRUEBA: los reales salen de la cartilla de clientes que exporta Helisa (por confirmar).
  const DANE = { Florencia: '18001', Morelia: '18479' };
  clientes.forEach((c, i) => {
    const valido = c.estado !== 'pendiente_validar';
    c.helisa = {
      codigo_cliente: valido ? String(1001 + i) : '',
      codigo_estado: valido ? 'prueba' : 'falta', // prueba | confirmado | falta
      lista_precio: valido ? helisa.lista_precio.codigo : '',
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
  // ---------------------------------------------------------------------
  // PROPUESTA 2 · Datos fiscales del cliente (FEV-03): OBLIGATORIOS para facturar electrónicamente.
  // «Sin datos fiscales no se factura»: la prefactura de un cliente incompleto queda bloqueada.
  // Todo es DATO DE PRUEBA salvo lo de Cofema que se vio en la FVE 25756 (R-99-PN, responsable de IVA,
  // correo de facturación). Los NIT de los demás clientes son ficticios: en esta propuesta su DV se
  // calcula con el algoritmo de la DIAN (la DIAN rechaza una factura con el DV del adquirente errado).
  // ---------------------------------------------------------------------
  function dvDIAN(nit) {
    const s = String(nit || '').replace(/\D/g, ''); if (!s) return '';
    const pesos = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
    let sum = 0; for (let i = 0; i < s.length; i++) sum += Number(s[s.length - 1 - i]) * pesos[i];
    const r = sum % 11; return String(r > 1 ? 11 - r : r);
  }
  const RESPONSABILIDADES_DIAN = { 'O-13': 'Gran contribuyente', 'O-15': 'Autorretenedor', 'O-23': 'Agente de retención de IVA', 'O-47': 'Régimen simple de tributación', 'R-99-PN': 'No aplica · otros' };
  const TRIBUTO_DIAN = { '01': 'IVA · responsable', 'ZZ': 'No aplica' };
  (function () {
    clientes.forEach((c) => { if (c.dv && !c.dato_prueba && c.id !== 'c-cofema') c.dv = dvDIAN(c.nit); });
    const JURIDICA = (c) => /^(8|9)\d{8}$/.test(c.nit);
    clientes.forEach((c) => {
      if (c.estado === 'pendiente_validar') return; // Nueva Esperanza: creado en campo, sin DV ni datos fiscales
      Object.assign(c.fiscal, {
        tipo_persona: JURIDICA(c) ? 'juridica' : 'natural', tipo_documento: 'NIT', responsabilidades: 'R-99-PN',
        tributo: JURIDICA(c) ? '01' : 'ZZ', regimen_iva: JURIDICA(c) ? 'Responsable de IVA' : 'No responsable de IVA',
        direccion: c.direccion, departamento_dane: '18', correo_fe: c.email || '', medio_entrega: c.email ? 'correo' : 'impresa',
        correo_estado: c.email ? 'verificado' : '', fuente: 'Dato de prueba', actualizado_en: '2026-09-21',
      });
    });
    const cof = clientes.find((c) => c.id === 'c-cofema');
    Object.assign(cof.fiscal, { fuente: 'Visto en la FVE 25756 (responsable de IVA, R-99-PN, correo de facturación); confirmar con el RUT' });
    // Piel Viva: el correo de recepción rebotó al entregar la RHD 8 (septiembre). Hasta confirmarlo, su prefactura queda bloqueada.
    const pv = clientes.find((c) => c.id === 'c-pielviva');
    Object.assign(pv.fiscal, { correo_estado: 'rebotado', correo_rebote: '2026-09-28 08:32 · buzón lleno (respuesta del servidor de correo, simulada)' });
    // El Trébol estaba registrado como persona natural: la DIAN rechazó su factura de septiembre (rechazo simulado) y Lucrecia lo corrigió.
    const pe = clientes.find((c) => c.id === 'c-trebol');
    Object.assign(pe.fiscal, { actualizado_en: '2026-09-28', nota: 'Tipo de persona corregido de natural a jurídica el 28/09 después del rechazo de la RHD 2.' });
    const a = clientes.find((c) => c.id === 'c-prueba-kg');
    Object.assign(a.fiscal, { correo_fe: 'recepcion.fe@example.com', medio_entrega: 'correo', correo_estado: 'verificado', actualizado_en: '2026-09-28' });
    const b = clientes.find((c) => c.id === 'c-prueba-fijo');
    Object.assign(b.fiscal, { correo_fe: 'facturas.prueba@example.com', medio_entrega: 'correo', correo_estado: 'verificado', actualizado_en: '2026-10-01' });
  })();
  // Revisión de los datos fiscales de un cliente: lo que se exige antes de que su prefactura pueda emitirse.
  function fiscalEstado(c) {
    const f = c.fiscal || {};
    const dvOk = !!c.dv && c.dv === dvDIAN(c.nit);
    const entregaOk = f.medio_entrega === 'impresa' || (f.medio_entrega === 'correo' && /@/.test(f.correo_fe || '') && f.correo_estado !== 'rebotado');
    const items = [
      { k: 'persona', etiqueta: 'Tipo de persona', ok: !!f.tipo_persona, valor: ({ juridica: 'Jurídica', natural: 'Natural' })[f.tipo_persona] || 'Falta' },
      { k: 'documento', etiqueta: 'Documento y dígito de verificación', ok: dvOk, valor: c.dv ? `${f.tipo_documento || 'NIT'} ${nitCompleto(c)}${dvOk ? '' : ' · el DV no corresponde al NIT'}` : 'Falta el dígito de verificación' },
      { k: 'responsabilidades', etiqueta: 'Responsabilidades fiscales (RUT)', ok: !!f.responsabilidades, valor: f.responsabilidades ? `${f.responsabilidades} · ${RESPONSABILIDADES_DIAN[f.responsabilidades] || ''}` : 'Falta' },
      { k: 'tributo', etiqueta: 'Régimen de IVA (tributo)', ok: !!f.tributo, valor: f.tributo ? `${f.tributo} · ${f.regimen_iva}` : 'Falta' },
      { k: 'direccion', etiqueta: 'Dirección y municipio (código DANE)', ok: !!(f.direccion && f.municipio_dane), valor: f.municipio_dane ? `${c.ciudad} · ${f.municipio_dane}` : 'Falta el municipio' },
      { k: 'entrega', etiqueta: 'Medio de entrega de la factura', ok: entregaOk, valor: f.medio_entrega === 'impresa' ? 'Impresa (el cliente no informó correo)' : (f.correo_estado === 'rebotado' ? `Correo rebotado: ${f.correo_fe}` : (f.correo_fe || 'Falta el correo de recepción')) },
    ];
    const faltan = items.filter((i) => !i.ok);
    return { completo: !faltan.length, items, faltan, texto: faltan.length ? faltan.map((i) => i.etiqueta.toLowerCase()).join(', ') : 'Completos' };
  }
  // (c.fiscal.completo se calcula más abajo, cuando ya existen las ayudas de formato)

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
    // Cofema, septiembre 2026: kilos reales del formulario en papel (fuentes/FORMATO RH.pdf); en el sistema su RH es el 22690-26
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
    { id: 'v-tre-0909', consecutivo: 1098, cliente: 'c-trebol', periodo: '2026-09', fecha: '2026-09-09', hora: '12:30', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 2.2, CORTO: 0.5, TOX: 1.9 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Marleny D.', entrega_documento: '1.000.000.215', gps: [1.4869, -75.7251], firmas: true, fotos: 0 },
    { id: 'v-tre-0923', consecutivo: 1128, cliente: 'c-trebol', periodo: '2026-09', fecha: '2026-09-23', hora: '12:40', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'en_cierre', kilos: { BIO: 1.9, CORTO: 0.4, TOX: 2.3 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Marleny D.', entrega_documento: '1.000.000.215', gps: [1.4869, -75.7251], firmas: true, fotos: 0 },

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
    { id: 'v-tre-1007', consecutivo: 1147, cliente: 'c-trebol', periodo: '2026-10', fecha: '2026-10-07', hora: '12:35', operario: 'op-dubeny', auxiliar: 'op-jesus', placa: 'SNV 429', tipo: 'recoleccion', estado: 'transmitida', kilos: { BIO: 2.0, CORTO: 0.5, TOX: 2.1 }, bolsas: 2, guardianes: 1, entrega_nombre: 'Marleny D.', entrega_documento: '1.000.000.215', gps: [1.4869, -75.7251], firmas: true, fotos: 0 },
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
    // ABONO DE PRUEBA de Cofema: $500.000 a la RHD 1 (en la Fase 1, FVE 25756), el mismo del levantamiento y de la SPEC; deja un saldo de $1.744.935.
    { id: 'r-35672', consecutivo: 35672, cliente: 'c-cofema', visita: null, fecha: '2026-09-26', hora: '11:20', operario: 'op-dubeny', valor: 500000, concepto: 'Abono a la factura RHD 1 · septiembre de 2026 (abono de prueba)', pagador: 'Funcionario Cofema (prueba)', pagador_documento: '(dato de prueba)', estado: 'emitido', conciliado: false, dato_prueba: true, nota_prueba: 'Abono de PRUEBA de $500.000 sobre la RHD 1 (en la Fase 1, FVE 25756): el mismo del levantamiento y de la SPEC. Deja un saldo de $1.744.935.' },
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
    // PROPUESTA 2 · del lunes 19 al jueves 22 de octubre (cierres anticipados, prefacturas, emisión por el proveedor SIMULADO, RADIAN y contabilidad)
    { en: '2026-10-22 08:40', quien: 'Dubeny', accion: 'Abrió visita (borrador)', entidad: 'Visita · Veterinaria Huellas', detalle: 'Desde el celular Samsung A35' },
    { en: '2026-10-22 08:12', quien: 'Sistema', accion: 'Bloqueó la prefactura de Piel Viva', entidad: 'Facturación electrónica · Octubre 2026', detalle: 'Datos fiscales incompletos: el correo de recepción rebotó el 28/09' },
    { en: '2026-10-22 08:10', quien: 'Sistema', accion: 'Generó 4 prefacturas desde los cierres', entidad: 'Facturación electrónica · Octubre 2026', detalle: 'Sonrisas del Caquetá, Droguería La Economía, Piel Viva y Consultorio Dr. Ramírez' },
    { en: '2026-10-22 08:08', quien: 'Lucrecia', accion: 'Cerró el cliente (cierre anticipado)', entidad: 'Cierre · Consultorio Dr. Ramírez · Octubre 2026', detalle: 'RH 22707-26 · 3,20 kg · $54.740' },
    { en: '2026-10-22 08:06', quien: 'Lucrecia', accion: 'Cerró el cliente (cierre anticipado)', entidad: 'Cierre · Piel Viva · Octubre 2026', detalle: 'RH 22706-26 · 3,00 kg · $49.980' },
    { en: '2026-10-22 08:04', quien: 'Lucrecia', accion: 'Cerró el cliente (cierre anticipado)', entidad: 'Cierre · Droguería La Economía · Octubre 2026', detalle: 'RH 22705-26 · 5,90 kg · $53.550' },
    { en: '2026-10-22 08:02', quien: 'Lucrecia', accion: 'Cerró el cliente (cierre anticipado)', entidad: 'Cierre · Sonrisas del Caquetá · Octubre 2026', detalle: 'RH 22704-26 · 4,10 kg · $57.120' },
    { en: '2026-10-21 16:44', quien: 'Proveedor (simulado)', accion: 'Puso la RHD 14 en contingencia', entidad: 'Factura electrónica · RHD 14', detalle: 'La DIAN no respondió; el proveedor reintenta cada 30 minutos (contingencia tipo 04)' },
    { en: '2026-10-21 16:14', quien: 'Lucrecia', accion: 'Emitió el lote L-2026-10-002', entidad: 'Facturación electrónica · Octubre 2026', detalle: 'RHD 14 · Centro Clínico de Prueba · $515.375,43 (solo por kilo)' },
    { en: '2026-10-21 16:05', quien: 'Lucrecia', accion: 'Cerró el cliente (cierre anticipado)', entidad: 'Cierre · Centro Clínico de Prueba · Octubre 2026', detalle: 'RH 22703-26 · 108,50 kg · $515.375,43 (solo por kilo)' },
    { en: '2026-10-21 09:02', quien: 'Servidor', accion: 'Transmitida constancia 1209', entidad: 'Visita · Centro Clínico de Prueba', detalle: '27,15 kg' },
    { en: '2026-10-21 08:30', quien: 'Proveedor (simulado)', accion: 'Recibió el evento RADIAN 032 de la RHD 13', entidad: 'Factura electrónica · RHD 13', detalle: 'Recibo del servicio · Consultorio de Prueba' },
    { en: '2026-10-20 11:15', quien: 'Proveedor (simulado)', accion: 'Recibió el evento RADIAN 030 de la RHD 13', entidad: 'Factura electrónica · RHD 13', detalle: 'Acuse de recibo · Consultorio de Prueba' },
    { en: '2026-10-20 10:41', quien: 'Proveedor (simulado)', accion: 'La DIAN validó la RHD 13', entidad: 'Factura electrónica · RHD 13', detalle: 'CUFE de prueba; correo enviado al cliente' },
    { en: '2026-10-20 10:40', quien: 'Lucrecia', accion: 'Emitió el lote L-2026-10-001', entidad: 'Facturación electrónica · Octubre 2026', detalle: 'RHD 13 · Consultorio de Prueba · $29.750 (cobro fijo)' },
    { en: '2026-10-20 10:30', quien: 'Lucrecia', accion: 'Cerró el cliente (cierre anticipado)', entidad: 'Cierre · Consultorio de Prueba · Octubre 2026', detalle: 'RH 22702-26 · $29.750 (cobro fijo)' },
    { en: '2026-10-20 09:40', quien: 'Lucrecia', accion: 'Registró el recibo definitivo RC 8851', entidad: 'Contabilidad · COMSERVA_RC_2026-10_001', detalle: 'Recibo 35680 de Sonrisas del Caquetá cruzado con la RHD 5' },
    { en: '2026-10-20 09:15', quien: 'Lucrecia', accion: 'Generó el movimiento contable de recibos (RC)', entidad: 'Contabilidad · COMSERVA_RC_2026-10_001', detalle: '1 recibo entregado; plantilla RC v1' },
    { en: '2026-10-19 10:35', quien: 'Servidor', accion: 'Transmitida constancia 1188', entidad: 'Visita · Consultorio Dr. Ramírez', detalle: 'Reprogramada después de la visita fallida del 7 de octubre' },
    { en: '2026-10-19 08:03', quien: 'Servidor', accion: 'Transmitida constancia 1187', entidad: 'Visita · IPS Salud Vital', detalle: '18,50 kg' },
    { en: '2026-10-19 08:02', quien: 'Dubeny', accion: 'Abrió visita (borrador)', entidad: 'Visita · IPS Salud Vital', detalle: 'Desde el celular Samsung A35' },
    { en: '2026-10-18 07:52', quien: 'Jesús', accion: 'Cerró visita 1208 (en el celular)', entidad: 'Visita · Funeraria Los Olivos', detalle: 'Sin señal; en cola de envío' },
    { en: '2026-10-17 16:10', quien: 'Diego', accion: 'Consultó recaudo del día', entidad: 'Reportes', detalle: '' },
    { en: '2026-10-17 10:14', quien: 'Servidor', accion: 'Transmitida constancia 1186', entidad: 'Visita · Cofema', detalle: 'Hora del celular 10:12, del servidor 10:14' },
    { en: '2026-10-16 17:12', quien: 'Servidor', accion: 'Rechazó visita 1158', entidad: 'Visita · Droguería Nueva Esperanza', detalle: 'Cliente pendiente de validar' },
    { en: '2026-10-16 17:05', quien: 'Dubeny', accion: 'Creó cliente en campo', entidad: 'Cliente · Droguería Nueva Esperanza', detalle: 'Pendiente de validar por la oficina (sin datos fiscales: no se puede facturar)' },
    { en: '2026-10-15 10:20', quien: 'Proveedor (simulado)', accion: 'Recibió el evento RADIAN 032 de la RHD 12', entidad: 'Factura electrónica · RHD 12', detalle: 'Recibo del servicio · Funeraria Los Olivos; la tácita se cumpliría el 21/10 (034 · opcional, por confirmar)' },
    { en: '2026-10-13 15:40', quien: 'Lucrecia', accion: 'Anuló visita 1154', entidad: 'Visita · Laboratorio Amazonía', detalle: 'Motivo: error de digitación (60,2 kg). Reemplazo: 1155' },
    { en: '2026-10-10 11:20', quien: 'Lucrecia', accion: 'Marcó pago por transferencia', entidad: 'Factura · Visión Sur RHD 9', detalle: 'Bancolombia ref. 884120; solo saldo de referencia' },
    { en: '2026-10-09 14:05', quien: 'Lucrecia', accion: 'Anuló recibo 35685', entidad: 'Recibo de caja · Tinta Negra', detalle: 'Valor incorrecto' },
    { en: '2026-10-05 15:20', quien: 'Lucrecia', accion: 'Importó en Helisa el movimiento contable de la NC 1', entidad: 'Contabilidad · COMSERVA_MCFV_2026-10_001.csv', detalle: 'Reverso parcial de la RHD 7 en los libros F y N' },
    { en: '2026-10-05 11:42', quien: 'Proveedor (simulado)', accion: 'La DIAN validó la nota crédito NC 1', entidad: 'Nota crédito · NC 1', detalle: 'Veterinaria Huellas · RHD 7 · $11.900' },
    { en: '2026-10-05 11:40', quien: 'Diego', accion: 'Aprobó la nota crédito NC 1', entidad: 'Nota crédito · NC 1', detalle: 'Descuento comercial por pronto pago (dato de prueba)' },
    { en: '2026-10-05 09:15', quien: 'Lucrecia', accion: 'Solicitó la nota crédito NC 1', entidad: 'Nota crédito · NC 1', detalle: 'Veterinaria Huellas · RHD 7' },
    { en: '2026-09-30 08:00', quien: 'Sistema', accion: 'Avisó que la aceptación tácita de la RHD 1 se cumpliría desde hoy (034 · opcional, por confirmar)', entidad: 'Factura electrónica · RHD 1', detalle: 'Cofema no aceptó ni reclamó en los 3 días hábiles siguientes al evento 032. El 034 no se registró: Comserva decide si lo necesita' },
    { en: '2026-09-29 10:12', quien: 'Lucrecia', accion: 'Registró recibos definitivos RC 8812–8815', entidad: 'Contabilidad · COMSERVA_RC_2026-09_001', detalle: 'Cruce hecho en Helisa por DOC FUENTE (facturas FVE de agosto, anteriores al sistema, y la RHD 1: con el abono de prueba de Cofema, recibo 35672 → RC 8815, queda con saldo de $1.744.935)' },
    { en: '2026-09-29 09:50', quien: 'Lucrecia', accion: 'Generó el movimiento contable de recibos (RC)', entidad: 'Contabilidad · COMSERVA_RC_2026-09_001', detalle: '4 recibos entregados; plantilla RC v1' },
    { en: '2026-09-28 09:40', quien: 'Lucrecia', accion: 'Importó en Helisa el movimiento contable de facturas', entidad: 'Contabilidad · COMSERVA_MCFV_2026-09_003.csv', detalle: '11 facturas (RHD 2 a RHD 12) en los libros F y N' },
    { en: '2026-09-28 09:22', quien: 'Lucrecia', accion: 'Generó el movimiento contable de facturas', entidad: 'Contabilidad · COMSERVA_MCFV_2026-09_003.csv', detalle: 'El Trébol ya existe como tercero en Helisa' },
    { en: '2026-09-28 09:05', quien: 'Lucrecia', accion: 'Marcó rechazado el movimiento contable de facturas', entidad: 'Contabilidad · COMSERVA_MCFV_2026-09_002.csv', detalle: 'Helisa: el tercero 900555017 (El Trébol) no existe' },
    { en: '2026-09-28 08:50', quien: 'Lucrecia', accion: 'Generó el movimiento contable de facturas', entidad: 'Contabilidad · COMSERVA_MCFV_2026-09_002.csv', detalle: '11 facturas (RHD 2 a RHD 12)' },
    { en: '2026-09-28 08:46', quien: 'Proveedor (simulado)', accion: 'La DIAN validó la RHD 2 (reenvío con el mismo número)', entidad: 'Factura electrónica · RHD 2', detalle: 'El Trébol · $71.447,60' },
    { en: '2026-09-28 08:44', quien: 'Lucrecia', accion: 'Corrigió los datos fiscales y reenvió la RHD 2', entidad: 'Cliente · El Trébol', detalle: 'Tipo de persona: de natural a jurídica' },
    { en: '2026-09-28 08:31', quien: 'Proveedor (simulado)', accion: 'La DIAN rechazó la RHD 2', entidad: 'Factura electrónica · RHD 2', detalle: 'Rechazo simulado: el tipo de persona del adquirente no coincide con el RUT' },
    { en: '2026-09-28 08:31', quien: 'Proveedor (simulado)', accion: 'La DIAN validó 10 facturas del lote', entidad: 'Facturación electrónica · Septiembre 2026', detalle: 'RHD 3 a RHD 12 · CUFE de prueba; correos enviados (1 rebotó: Piel Viva)' },
    { en: '2026-09-28 08:30', quien: 'Lucrecia', accion: 'Emitió el lote L-2026-09-002', entidad: 'Facturación electrónica · Septiembre 2026', detalle: '11 facturas (RHD 2 a RHD 12) · $1.464.890' },
    { en: '2026-09-28 08:12', quien: 'Lucrecia', accion: 'Revisó 11 prefacturas', entidad: 'Facturación electrónica · Septiembre 2026', detalle: 'Todas iguales al RH (diferencia $0)' },
    { en: '2026-09-28 07:40', quien: 'Lucrecia', accion: 'Recibió el efectivo del recibo 35672', entidad: 'Recibo de caja · Cofema S.A.', detalle: 'Abono de prueba de $500.000 a la RHD 1' },
    { en: '2026-09-26 18:05', quien: 'Diego', accion: 'Aprobó y firmó 12 actas', entidad: 'Periodo · Septiembre 2026', detalle: 'Complemento C1 (anticipo)' },
    { en: '2026-09-26 17:41', quien: 'Lucrecia', accion: 'Cerró el periodo', entidad: 'Periodo · Septiembre 2026', detalle: '11 clientes en el corte (Cofema se cerró el 22); 12 RH en total' },
    { en: '2026-09-26 11:20', quien: 'Dubeny', accion: 'Emitió el recibo de caja 35672 (abono de prueba)', entidad: 'Recibo de caja · Cofema S.A.', detalle: '$500.000 aplicados a la RHD 1; saldo de referencia $1.744.935' },
    { en: '2026-09-24 09:30', quien: 'Proveedor (simulado)', accion: 'Recibió el evento RADIAN 032 de la RHD 1', entidad: 'Factura electrónica · RHD 1', detalle: 'Recibo del servicio · Cofema' },
    { en: '2026-09-23 10:02', quien: 'Proveedor (simulado)', accion: 'Recibió el evento RADIAN 030 de la RHD 1', entidad: 'Factura electrónica · RHD 1', detalle: 'Acuse de recibo · Cofema' },
    { en: '2026-09-23 09:05', quien: 'Lucrecia', accion: 'Importó en Helisa el movimiento contable de facturas', entidad: 'Contabilidad · COMSERVA_MCFV_2026-09_001.csv', detalle: 'RHD 1 · Cofema · D = C = $2.244.935 en cada libro' },
    { en: '2026-09-23 08:40', quien: 'Lucrecia', accion: 'Generó el movimiento contable de facturas', entidad: 'Contabilidad · COMSERVA_MCFV_2026-09_001.csv', detalle: 'RHD 1 · Cofema' },
    { en: '2026-09-23 08:15', quien: 'Proveedor (simulado)', accion: 'La DIAN validó la RHD 1', entidad: 'Factura electrónica · RHD 1', detalle: 'CUFE de prueba; correo enviado a Cofema' },
    { en: '2026-09-23 08:14', quien: 'Lucrecia', accion: 'Emitió el lote L-2026-09-001', entidad: 'Cierre · Cofema S.A. · Septiembre 2026', detalle: 'RHD 1 · $2.244.935 · igual al RH 22690-26' },
    { en: '2026-09-22 15:24', quien: 'Sistema', accion: 'Generó la prefactura de Cofema', entidad: 'Cierre · Cofema S.A. · Septiembre 2026', detalle: '2 líneas · IVA $14.210,10 + $344.224,90 = $358.435 · igual al RH' },
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
  // PROPUESTA 2: abierto → cerrado → prefacturado → facturado (factura electrónica validada por la DIAN) → contabilizado (asiento importado en Helisa)
  const ESTADO_CIERRE_LABEL = { abierto: 'Abierto', cerrado: 'Cerrado', prefacturado: 'Prefacturado', exportado: 'Exportado', facturado: 'Facturado', contabilizado: 'Contabilizado' };

  function sumarDias(s, n) { const d = parseISO(s); d.setDate(d.getDate() + n); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

  // Facturas registradas (FVE que Lucrecia devuelve después de importar el archivo FV).
  // Agosto: anteriores al sistema (solo para que los recibos de septiembre apliquen a algo).
  const facturas = [
    { id: 'f-25699', numero: 'FVE 25699', cliente: 'c-economia', periodo: '2026-08', fecha: '2026-08-26', vence: '2026-08-26', total: 53550, pagada_otro_medio: 0, origen: 'Helisa (antes del sistema)' },
    { id: 'f-25702', numero: 'FVE 25702', cliente: 'c-pielviva', periodo: '2026-08', fecha: '2026-08-26', vence: '2026-08-26', total: 49980, pagada_otro_medio: 0, origen: 'Helisa (antes del sistema)' },
    { id: 'f-25710', numero: 'FVE 25710', cliente: 'c-tinta', periodo: '2026-08', fecha: '2026-08-26', vence: '2026-08-26', total: 47600, pagada_otro_medio: 0, origen: 'Helisa (antes del sistema)' },
    { id: 'f-25745', numero: 'FVE 25745', cliente: 'c-saludvital', periodo: '2026-08', fecha: '2026-08-25', vence: '2026-09-24', total: 207298, pagada_otro_medio: 0, origen: 'Helisa (antes del sistema)' },
  ];
  // PROPUESTA 2 · Septiembre facturado por el sistema: una factura electrónica por cliente activo con el total del RH.
  // Prefijo de PRUEBA «RHD». Cofema = RHD 1 (23 sep, mismo contenido y total que la FVE 25756 real); las demás, RHD 2 a 12 (lote del lunes 28 sep).
  const plazoDias = (t) => (/30/.test((t || {}).plazo || '') ? 30 : (/10/.test((t || {}).plazo || '') ? 14 : 0));
  (function () {
    let n = 2;
    const p = byId(periodos, '2026-09');
    clientes.filter((c) => c.estado === 'activo').forEach((c) => {
      const f = cierreCliente(c.id, p.id).factura; if (!f) return;
      const t = tarifaVigente(c, p.fin);
      const esCofema = c.id === 'c-cofema';
      const num = esCofema ? 1 : n;
      const fecha = esCofema ? '2026-09-23' : '2026-09-28';
      facturas.push({ id: 'f-rhd-' + num, numero: 'RHD ' + num, prefijo: 'RHD', consecutivo: num, cliente: c.id, periodo: p.id, fecha, vence: sumarDias(fecha, plazoDias(t)), total: f.total, pagada_otro_medio: 0, origen: 'Factura electrónica emitida por el sistema (proveedor tecnológico simulado)', via_registro: 'sistema', registrada_por: 'Lucrecia', registrada_en: esCofema ? '2026-09-23 08:14' : '2026-09-28 08:30', dato_prueba: true });
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
    ap('r-35673', 'f-25710', 47600, { tipo: 'pago_factura', estado: 'cruzado', entregado_en: '2026-09-23 07:30', archivo: 'ap-rc-2026-09-001', recibo_helisa: 'RC 8814', recibo_helisa_fecha: '2026-09-29', cruzado_en: '2026-09-29 10:12', conciliado: true });
    const fpv = facturaDe('c-pielviva', '2026-09'), feco = facturaDe('c-economia', '2026-09'), ftn = facturaDe('c-tinta', '2026-09');
    // v6: Sonrisas pagó en efectivo su factura de septiembre el 1 de octubre; el recibo ya se cruzó en Helisa (cadena completa para la trazabilidad)
    const fson = facturaDe('c-sonrisas', '2026-09');
    const r80 = byId(recibos, 'r-35680'); r80.valor = fson.total; r80.concepto = `Pago de factura ${fson.numero} · septiembre de 2026`;
    ap('r-35680', fson.id, fson.total, { tipo: 'pago_factura', estado: 'cruzado', entregado_en: '2026-10-02 07:40', archivo: 'ap-rc-2026-10-001', recibo_helisa: 'RC 8851', recibo_helisa_fecha: '2026-10-20', cruzado_en: '2026-10-20 09:40', conciliado: true });
    const r86 = byId(recibos, 'r-35686'); r86.valor = fpv.total; r86.concepto = `Pago de factura ${fpv.numero} · septiembre de 2026`; ap('r-35686', fpv.id, fpv.total, { tipo: 'pago_factura', estado: 'entregado', entregado_en: '2026-10-13 07:45', conciliado: false });
    // Cofema: abono de PRUEBA con el recibo 35672 a la RHD 1 → archivo RC de septiembre → cruce (RC 8815); saldo de referencia $1.744.935 (igual que en la propuesta 1 con la FVE 25756)
    ap('r-35672', facturaDe('c-cofema', '2026-09').id, 500000, { tipo: 'abono', estado: 'cruzado', entregado_en: '2026-09-28 07:40', archivo: 'ap-rc-2026-09-001', recibo_helisa: 'RC 8815', recibo_helisa_fecha: '2026-09-29', cruzado_en: '2026-09-29 10:12', conciliado: true });
    const r87 = byId(recibos, 'r-35687'); r87.valor = 30000; r87.concepto = `Abono a la factura ${feco.numero} · septiembre de 2026`; ap('r-35687', feco.id, 30000, { tipo: 'abono', estado: 'emitido', conciliado: false });
    const r85 = byId(recibos, 'r-35685'); r85.valor = 47600; r85.concepto = `Pago de factura ${ftn.numero} · septiembre de 2026`; r85.anulacion_motivo = `Valor incorrecto: la factura de septiembre fue ${fmtCOP(ftn.total)}. El operario debe emitir un recibo nuevo.`; Object.assign(r85, { tipo: 'pago_factura', aplicaciones: [{ factura: ftn.id, valor: 47600 }], conciliado: false });
  })();

  // Saldo de referencia por factura: total − recibos vigentes − pagos por otro medio. No es la cartera contable (esa vive en Helisa).
  // PROPUESTA 2: las notas crédito validadas por la DIAN restan del saldo y las notas débito suman (se llenan más abajo)
  const notas_fe = [];
  const ajusteNotas = (facturaId) => notas_fe.filter((x) => x.factura === facturaId && x.estado === 'validada').reduce((a, x) => a + (x.tipo === 'NC' ? -x.total : x.total), 0);
  function saldoReferencia(facturaId, extraRecibos = []) {
    const f = factura(facturaId); if (!f) return 0;
    if (f.estado_dian === 'anulada') return 0;
    const rs = recibos.concat(extraRecibos).filter((r) => r.estado !== 'anulado' && (r.aplicaciones || []).some((a) => a.factura === facturaId));
    const pagado = rs.reduce((a, r) => a + r.aplicaciones.filter((x) => x.factura === facturaId).reduce((s, x) => s + x.valor, 0), 0);
    return Math.max(0, r2(f.total + ajusteNotas(facturaId) - pagado - (f.pagada_otro_medio || 0)));
  }
  // Recibo de caja SOLO con factura validada por la DIAN (una factura enviada, rechazada o en contingencia no admite pagos)
  const facturaCobrable = (f) => !f.estado_dian || f.estado_dian === 'validada';
  function facturasConSaldo(clienteId, extraRecibos = []) {
    return facturas.filter((f) => f.cliente === clienteId && facturaCobrable(f)).map((f) => ({ ...f, saldo: saldoReferencia(f.id, extraRecibos), vencida: f.vence < HOY })).filter((f) => f.saldo > 0).sort((a, b) => a.fecha.localeCompare(b.fecha));
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
    { id: 'ap-fv-2026-09-002', tipo: 'FV', periodo: '2026-09', plantilla: 'pl-fv-1', consecutivo: 2, nombre: 'COMSERVA_FV_2026-09_002.xls', estado: 'importado', generado_por: 'Lucrecia', generado_en: '2026-09-27 09:05', descargado_en: '2026-09-27 09:06', importado_en: '2026-09-27 09:40', importado_por: 'Lucrecia', documentos: 12, filas: 46, debitos: 1180452, creditos: 1180452, sha256: '', nota: 'Terceros creados en Helisa a mano el 27 de septiembre (El Trébol). 12 facturas generadas: FVE 25756 a 25767.' },
    { id: 'ap-rc-2026-09-001', tipo: 'RC', periodo: '2026-09', plantilla: 'pl-rc-1', consecutivo: 1, nombre: 'COMSERVA_RC_2026-09_001.xls', estado: 'importado', generado_por: 'Lucrecia', generado_en: '2026-09-29 09:50', descargado_en: '2026-09-29 09:51', importado_en: '2026-09-29 10:10', importado_por: 'Lucrecia', documentos: 4, filas: 8, debitos: 651130, creditos: 651130, sha256: '', nota: 'Recibos definitivos RC 8812 a 8815; cruce automático por DOC FUENTE. Incluye el abono de prueba de Cofema (recibo 35672 → RC 8815): la RHD 1 queda con saldo de $1.744.935.' },
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
    // PROPUESTA 2 · hoy, jueves 22 de octubre, Lucrecia cerró antes del corte cuatro clientes mensuales que ya tuvieron su visita del mes:
    // sus prefacturas esperan revisión en «Facturación electrónica» (la de Piel Viva, bloqueada por datos fiscales).
    { cliente: 'c-sonrisas', periodo: '2026-10', cerrado_en: '2026-10-22 08:02', cerrado_por: 'Lucrecia', rh: '22704-26', anticipado: true },
    { cliente: 'c-economia', periodo: '2026-10', cerrado_en: '2026-10-22 08:04', cerrado_por: 'Lucrecia', rh: '22705-26', anticipado: true },
    { cliente: 'c-pielviva', periodo: '2026-10', cerrado_en: '2026-10-22 08:06', cerrado_por: 'Lucrecia', rh: '22706-26', anticipado: true },
    { cliente: 'c-ramirez', periodo: '2026-10', cerrado_en: '2026-10-22 08:08', cerrado_por: 'Lucrecia', rh: '22707-26', anticipado: true },
  ];
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

  // PROPUESTA 2: no hay pedidos hacia Helisa. El cierre pasa directo a la prefactura y a la factura electrónica.
  // Regla contra la doble facturación: un cierre facturado por el sistema no se exporta como pedido, y lo de RH no se factura en Helisa.
  // (Las estructuras de pedidos quedan vacías para que las páginas comunes con la propuesta 1 no fallen.)
  const ESTADO_PEDIDO_LABEL = { generado: 'Generado', descargado: 'Descargado', enviado: 'Enviado por API', importado: 'Importado en Helisa', facturado: 'Facturado', rechazado: 'Rechazado por Helisa', anulado: 'Anulado' };
  const archivos_op = [];
  const pedidos = [];
  const pedidoDe = () => null;
  // CUFE y CUDE de PRUEBA: 96 caracteres hexadecimales con la forma de un SHA-384, pero ficticios (no los calcula la DIAN).
  const cufePrueba = (seed) => (hashFake(seed + '|a') + hashFake(seed + '|b') + hashFake(seed + '|c')).slice(0, 96);
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

  // Estado del cierre de un cliente (PROPUESTA 2): abierto → cerrado → prefacturado (el sistema armó la prefactura) → facturado
  // (factura electrónica validada por la DIAN) → contabilizado (su asiento quedó importado en Helisa). Una factura enviada,
  // rechazada o en contingencia deja el cierre en «prefacturado»; sin liquidación (cliente sin tarifa) queda en «cerrado».
  function estadoCierre(clienteId, periodoId) {
    const p = byId(periodos, periodoId); if (!p) return 'abierto';
    if (p.estado === 'abierto' && !cierreAnticipado(clienteId, periodoId)) return 'abierto';
    const f = facturaDe(clienteId, periodoId);
    if (!f || (f.estado_dian && f.estado_dian !== 'validada')) return cierreCliente(clienteId, periodoId).factura ? 'prefacturado' : 'cerrado';
    const a = f.asiento ? archivos_plano.find((x) => x.id === f.asiento) : null;
    return a && a.estado === 'importado' ? 'contabilizado' : 'facturado';
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
  // PROPUESTA 2 · FACTURACIÓN ELECTRÓNICA POR PROVEEDOR TECNOLÓGICO (FEV-01 a FEV-15)
  // ---------------------------------------------------------------------
  // Todo lo de esta sección es DATO DE PRUEBA: el proveedor está SIMULADO (Plemsi, Dataico o el que se
  // elija: por confirmar), el ambiente es de PRUEBAS, el prefijo «RHD» y su rango son de prueba y los
  // CUFE, CUDE, XML y PDF son ficticios. Nada se envía a la DIAN.
  //   Cierre → prefactura (borrador) → revisión → emisión por lote → el proveedor firma, valida con la DIAN
  //   y devuelve CUFE, XML, PDF y QR → entrega al cliente → eventos RADIAN → asiento contable a Helisa.
  // Estados de la factura: borrador → enviada → validada (DIAN) | rechazada | contingencia; anulada solo con nota crédito.
  // =====================================================================
  const fe = (function () {
    const ESTADO = { borrador: 'Borrador', bloqueada: 'Bloqueada', enviada: 'Enviada', validada: 'Validada DIAN', rechazada: 'Rechazada', contingencia: 'Contingencia', anulada: 'Anulada', por_aprobar: 'Por aprobar' };
    const CLASE = { borrador: 'plain', bloqueada: 'danger', enviada: 'info', validada: 'ok', rechazada: 'danger', contingencia: 'warn', anulada: 'plain', por_aprobar: 'warn' };
    const EVENTOS = {
      '030': { corto: 'Acuse', etiqueta: 'Acuse de recibo de la factura', quien: 'El cliente' },
      '031': { corto: 'Reclamo', etiqueta: 'Reclamo de la factura', quien: 'El cliente' },
      '032': { corto: 'Recibo servicio', etiqueta: 'Recibo del bien o prestación del servicio', quien: 'El cliente' },
      '033': { corto: 'Aceptación expresa', etiqueta: 'Aceptación expresa', quien: 'El cliente' },
      '034': { corto: 'Aceptación tácita', etiqueta: 'Aceptación tácita', quien: 'Comserva, a los 3 días hábiles del 032 sin aceptación ni reclamo (opcional, por confirmar)' },
    };
    // Conceptos de corrección (tabla de la DIAN; confirmar los códigos con el proveedor)
    const CONCEPTOS_NC = { '1': 'Devolución parcial o no aceptación parcial del servicio', '2': 'Anulación de la factura electrónica', '3': 'Rebaja o descuento parcial o total', '4': 'Ajuste de precio' };
    const CONCEPTOS_ND = { '1': 'Intereses', '2': 'Gastos por cobrar', '3': 'Cambio del valor', '4': 'Otros' };

    const proveedores = [
      { id: 'plemsi', nombre: 'Plemsi', tipo: 'Proveedor tecnológico', nota: 'API para emitir y consultar; planes anuales con precio público. Figura en el listado de la DIAN como ECA S.A.S. (por confirmar).' },
      { id: 'dataico', nombre: 'Dataico', tipo: 'Proveedor tecnológico', nota: 'Figura en el listado de la DIAN; API con ambiente de pruebas gratuito; precio por cotización.' },
      { id: 'por_elegir', nombre: 'Por elegir', tipo: 'Decisión de la Fase 0', nota: 'Se decide con las cotizaciones. Alternativa: MATIAS API (modalidad software propio: Comserva quedaría como titular directa ante la DIAN).' },
    ];
    const config = { proveedor: 'por_elegir', ambiente: 'pruebas', simulado: true, alerta_pct: 90, alerta_dias: 60, envia_correo: 'Proveedor tecnológico (si no lo hace, el sistema con el ZIP que exige la DIAN)', reintento_min: 30, entrega_maxima_mb: 2 };
    const emisor = { nit: empresa.nit, razon_social: empresa.razon_social, nombre_comercial: empresa.nombre_corto, direccion: empresa.direccion, municipio: 'Florencia · 18001', departamento: 'Caquetá · 18', ciiu: '3822', tributo: '01 · IVA (responsable)', responsabilidades: 'R-99-PN', correo_recepcion: 'Por confirmar', correo_contacto: empresa.email, telefonos: empresa.telefonos, fuente: 'Actividad 3822, responsable de IVA y R-99-PN como aparecen en la FVE 25756; confirmar con el RUT.' };
    // Numeración: la de PRUEBA es la única activa en el mockup. Alertas cuando quede el 10 % del rango (90 % usado) o falten 60 días para el vencimiento (parámetros, FEV-02).
    const resoluciones = [
      { id: 'res-prueba', ambiente: 'pruebas', documento: 'Factura electrónica de venta', numero: '18760000000000 (de prueba)', prefijo: 'RHD', desde: 1, hasta: 200, vigente_desde: '2026-09-01', vigente_hasta: '2026-11-20', estado: 'activa', dato_prueba: true, nota: 'Resolución y rango DE PRUEBA para la demostración. El prefijo y el rango reales los autoriza la DIAN y se asocian al software del proveedor (por confirmar).' },
      { id: 'res-prod', ambiente: 'produccion', documento: 'Factura electrónica de venta', numero: 'Por solicitar', prefijo: 'Por confirmar', desde: null, hasta: null, vigente_desde: '', vigente_hasta: '', estado: 'por_solicitar', nota: 'Se pide en el portal de la DIAN después de la habilitación y del set de pruebas (por confirmar).' },
      { id: 'res-cont', ambiente: 'produccion', documento: 'Contingencia tipo 03 (falla del facturador o del proveedor)', numero: 'Por solicitar', prefijo: 'Por confirmar', desde: null, hasta: null, vigente_desde: '', vigente_hasta: '', estado: 'por_solicitar', nota: 'Rango para facturar en papel mientras dure la falla y transcribir después (por confirmar si se pide).' },
      { id: 'res-helisa', ambiente: 'produccion', documento: 'FVE de Helisa (sigue igual)', numero: 'Vigente en Helisa', prefijo: 'FVE', desde: null, hasta: null, vigente_desde: '', vigente_hasta: '', estado: 'helisa', nota: 'Helisa conserva su numeración para lo que siga facturando allí (productos, arrendamiento). Lo de RH no se factura en Helisa.' },
    ];
    // Catálogo de productos de la factura electrónica (FEV-04): concepto, unidad DIAN e IVA por concepto (configurable).
    const conceptos = [
      { codigo: 'RES-BAS', componente: 'basico', descripcion: 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS BIOLOGICOS', unidad: '94', unidad_nombre: 'unidad', iva_pct: 19, estado: 'Descripción vista en la FVE 25756' },
      { codigo: 'RES-KGA', componente: 'kg_adicionales', descripcion: 'KILOGRAMOS ADICIONALES', unidad: 'KGM', unidad_nombre: 'kilogramo', iva_pct: 19, estado: 'Descripción vista en la FVE 25756' },
      { codigo: 'RES-KG', componente: 'kg_todos', descripcion: 'RECOLEC. TRANSP Y DISPOS. FINAL RESIDUOS (POR KILO)', unidad: 'KGM', unidad_nombre: 'kilogramo', iva_pct: 19, estado: 'Por confirmar' },
      { codigo: 'RES-FIJ', componente: 'fijo', descripcion: 'SERVICIO MENSUAL DE RECOLECCION DE RESIDUOS (CUOTA FIJA)', unidad: '94', unidad_nombre: 'unidad', iva_pct: 19, estado: 'Por confirmar' },
    ];
    // Plantilla «servicio → cuenta» (la entregará Julio: POR CONFIRMAR). Cuentas de EJEMPLO tomadas de la plantilla v5.
    const cuentas = [
      { uso: 'ingreso', concepto: 'RES-BAS', etiqueta: 'Servicio básico mensual', F: '413550', N: '41205500506' },
      { uso: 'ingreso', concepto: 'RES-KGA', etiqueta: 'Kilogramos adicionales', F: '413550', N: '41205500506' },
      { uso: 'ingreso', concepto: 'RES-KG', etiqueta: 'Recolección por kilo', F: '413550', N: '41205500506' },
      { uso: 'ingreso', concepto: 'RES-FIJ', etiqueta: 'Cobro fijo mensual', F: '413550', N: '41205500506' },
      { uso: 'iva', concepto: '', etiqueta: 'IVA generado 19 %', F: '240805', N: '212200501' },
      { uso: 'cartera', concepto: '', etiqueta: 'Cartera de clientes (1305)', F: '130505', N: '112050502' },
      { uso: 'caja', concepto: '', etiqueta: 'Caja general (recibos en efectivo)', F: '110505', N: 'Por confirmar' },
      { uso: 'banco', concepto: '', etiqueta: 'Bancos (pagos por transferencia)', F: 'Por confirmar', N: 'Por confirmar' },
    ];
    const cuenta = (uso, libro, concepto) => { const c = cuentas.find((x) => x.uso === uso && (!concepto || x.concepto === concepto)) || cuentas.find((x) => x.uso === uso); return c ? c[libro] : ''; };

    // --- ayudas -----------------------------------------------------------------------------
    const masMin = (fh, n) => { const [d, t] = fh.split(' '); const [h, m] = t.split(':').map(Number); const tot = h * 60 + m + n; return `${d} ${String(Math.floor(tot / 60)).padStart(2, '0')}:${String(tot % 60).padStart(2, '0')}`; };
    const FESTIVOS = ['2026-08-07', '2026-08-17', '2026-10-12', '2026-11-02', '2026-11-16', '2026-12-08', '2026-12-25'];
    const esHabil = (iso) => { const w = parseISO(iso).getDay(); return w !== 0 && w !== 6 && !FESTIVOS.includes(iso.slice(0, 10)); };
    function sumarHabiles(iso, n) { let d = iso.slice(0, 10), k = 0; while (k < n) { d = sumarDias(d, 1); if (esHabil(d)) k++; } return d; }
    function diasHabilesEntre(desde, hasta) { let d = desde.slice(0, 10), k = 0; while (d < hasta.slice(0, 10)) { d = sumarDias(d, 1); if (esHabil(d)) k++; } return k; }
    const qrUrl = (cufe) => `https://catalogo-vpfe-hab.dian.gov.co/document/searchqr?documentkey=${cufe}`;
    const nombreMes = (p) => p.nombre.toUpperCase();
    // Líneas de la factura con IVA por línea (Cofema: 14.210,10 + 344.224,90 = 358.435,00)
    function lineas(cz) {
      const f = cz && cz.factura; if (!f) return [];
      return f.lineas.map((l, i) => {
        const k = conceptos.find((x) => x.componente === l.componente) || {};
        const pct = k.iva_pct ?? f.iva_pct; const base = r2(l.valor); const iva = r2(base * pct / 100);
        return { n: i + 1, codigo: k.codigo || '', descripcion: k.descripcion || l.concepto, unidad: k.unidad || '94', unidad_nombre: k.unidad_nombre || 'unidad', cantidad: l.cantidad, unitario: l.unitario, base, iva_pct: pct, iva, total: r2(base + iva), componente: l.componente };
      });
    }
    function totales(ls) { const subtotal = r2(ls.reduce((a, l) => a + l.base, 0)); const iva = r2(ls.reduce((a, l) => a + l.iva, 0)); return { subtotal, iva, total: r2(subtotal + iva) }; }
    const notasDocumento = (cz, rh) => [`SERVICIO ESPECIAL DE ASEO PRESTADO MES DE ${nombreMes(cz.periodo)}`, `Planilla RH ${rh || 'por asignar'} · ${fmtKg(cz.kg)} kg · ${cz.visitas.length} visita${cz.visitas.length === 1 ? '' : 's'}`];

    // --- facturas electrónicas emitidas (septiembre RHD 1 a 12 ya están en «facturas»; octubre RHD 13 y 14) --------------
    [['c-prueba-fijo', 13, '2026-10-20'], ['c-prueba-kg', 14, '2026-10-21']].forEach(([cid, num, fecha]) => {
      const c = cliente(cid); const cz = cierreCliente(cid, '2026-10'); const t = tarifaVigente(c, '2026-10-26');
      facturas.push({ id: 'f-rhd-' + num, numero: 'RHD ' + num, prefijo: 'RHD', consecutivo: num, cliente: cid, periodo: '2026-10', fecha, vence: sumarDias(fecha, plazoDias(t)), total: cz.factura.total, pagada_otro_medio: 0, origen: 'Factura electrónica emitida por el sistema (proveedor tecnológico simulado)', via_registro: 'sistema', registrada_por: 'Lucrecia', registrada_en: num === 13 ? '2026-10-20 10:40' : '2026-10-21 16:14', dato_prueba: true });
    });
    // Lo que pasó con cada factura (datos de prueba)
    const L1 = '2026-09-28 08:30';
    const SPEC = {
      1: { lote: 'L-2026-09-001', enviada: '2026-09-23 08:14', validada: '2026-09-23 08:15', revisada: '2026-09-23 08:12', entrega: { medio: 'correo', estado: 'enviado', en: '2026-09-23 08:16' }, eventos: [['030', '2026-09-23 10:02'], ['032', '2026-09-24 09:30']], asiento: 'ap-mcfv-2026-09-001' }, // 034 · opcional, por confirmar: la tácita se cumpliría el 30/09, pero no se registra
      2: { rechazo: { en: '2026-09-28 08:31', motivo: 'La DIAN indicó que el tipo de persona del adquirente (natural) no coincide con el registrado en el RUT (jurídica).', corregido_en: '2026-09-28 08:44', correccion: 'Lucrecia corrigió el tipo de persona en la ficha del cliente y reenvió la factura con el mismo número.' }, validada: '2026-09-28 08:46', entrega: { medio: 'correo', estado: 'enviado', en: '2026-09-28 08:47' }, eventos: [['030', '2026-09-28 11:20']] },
      3: { eventos: [['030', '2026-09-28 09:02']] },
      4: { eventos: [['030', '2026-09-28 10:15'], ['032', '2026-09-29 08:40'], ['033', '2026-09-30 11:05']] },
      5: { eventos: [] },
      6: { entrega: { medio: 'impresa', estado: 'entregada', en: '2026-10-16 16:40', nota: 'Entregada impresa por el operario en la visita del 16/10 (el cliente no informó correo)' }, eventos: [] },
      7: { eventos: [['030', '2026-09-28 12:30']] },
      8: { entrega: { medio: 'correo', estado: 'rebotado', en: '2026-09-28 08:32', reentrega_en: '2026-10-12 16:05', nota: 'El correo rebotó (buzón lleno). Se entregó impresa en la visita del 12/10; la ficha del cliente quedó con el correo por confirmar.' }, eventos: [] },
      9: { eventos: [['030', '2026-09-28 08:50'], ['032', '2026-09-29 14:20'], ['033', '2026-10-01 09:10']] },
      10: { entrega: { medio: 'impresa', estado: 'pendiente', en: '', nota: 'Pendiente de entregar impresa: el cliente no informó correo y no ha tenido visita en octubre (está en la ruta de hoy)' }, eventos: [] },
      11: { eventos: [['030', '2026-09-29 08:15']] },
      12: { eventos: [['030', '2026-09-28 09:30'], ['032', '2026-10-15 10:20']] },
      13: { lote: 'L-2026-10-001', revisada: '2026-10-20 10:38', enviada: '2026-10-20 10:40', validada: '2026-10-20 10:41', entrega: { medio: 'correo', estado: 'enviado', en: '2026-10-20 10:42' }, eventos: [['030', '2026-10-20 11:15'], ['032', '2026-10-21 08:30']], asiento: null },
      14: { lote: 'L-2026-10-002', revisada: '2026-10-21 16:11', enviada: '2026-10-21 16:14', validada: null, contingencia: { en: '2026-10-21 16:26', motivo: 'La DIAN no respondió después de 5 intentos (demora del servicio). El proveedor la maneja como contingencia tipo 04 y reintenta cada 30 minutos; plazo para transmitir: 48 horas desde que vuelva el servicio.' }, entrega: { medio: 'correo', estado: 'en_espera', en: '', nota: 'En espera: el proveedor la entrega según el manejo de la contingencia' }, eventos: [] },
    };
    facturas.filter((f) => f.prefijo === 'RHD').forEach((f) => {
      const s = SPEC[f.consecutivo] || {};
      const c = cliente(f.cliente); const cz = cierreCliente(f.cliente, f.periodo); const ci = cierreDe(f.cliente, f.periodo);
      const ls = lineas(cz); const tt = totales(ls);
      const enviada = s.enviada || L1;
      Object.assign(f, {
        lineas_fe: ls, subtotal: tt.subtotal, iva: tt.iva, rh: ci ? ci.rh : numeroRH(f.cliente, f.periodo), notas_doc: notasDocumento(cz, ci ? ci.rh : ''),
        lote: s.lote || 'L-2026-09-002', revisada_en: s.revisada || '2026-09-28 08:12', enviada_en: enviada,
        estado_dian: s.contingencia ? 'contingencia' : 'validada', validada_en: s.validada === undefined ? masMin(enviada, 1) : s.validada,
        hora: (s.validada === undefined ? masMin(enviada, 1) : (s.validada || enviada)).slice(11, 16),
        forma_pago: plazoDias(tarifaVigente(c, cz.periodo.fin)) ? `Crédito ${plazoDias(tarifaVigente(c, cz.periodo.fin))} días` : 'Contado', medio_pago: plazoDias(tarifaVigente(c, cz.periodo.fin)) ? 'Por confirmar' : 'Efectivo',
        cufe: cufePrueba(f.numero + '|' + f.cliente), cufe_prueba: true,
        entrega: Object.assign({ medio: (c.fiscal || {}).medio_entrega || 'correo', destino: (c.fiscal || {}).correo_fe || '', estado: 'enviado', en: masMin(enviada, 2), nota: '' }, s.entrega || {}),
        eventos: (s.eventos || []).map(([codigo, en]) => ({ codigo, en, por: codigo === '034' ? 'Comserva (registrado por el proveedor; opción por confirmar)' : c.nombre_comercial })),
        rechazo: s.rechazo || null, contingencia: s.contingencia || null,
        asiento: s.asiento !== undefined ? s.asiento : (f.periodo === '2026-09' ? 'ap-mcfv-2026-09-003' : null),
        respuesta_dian: s.contingencia ? 'Sin respuesta de la DIAN (contingencia tipo 04, simulada)' : 'Documento validado por la DIAN (respuesta simulada)',
      });
      if (f.entrega.medio === 'correo' && !f.entrega.destino) f.entrega.destino = c.email || '';
      f.qr = qrUrl(f.cufe);
      f.hash_xml = hashFake('xml|' + f.numero); f.hash_pdf = hashFake('pdf|' + f.numero); f.hash_zip = hashFake('zip|' + f.numero);
    });
    // Visión Sur pagó su RHD 9 por transferencia (marcado por Facturación, solo para el saldo de referencia)
    // (ya se marcó al construir las facturas de septiembre)

    // --- notas crédito y débito (numeración interna; aprobación de Gerencia; referencia al CUFE) ---------------------
    const f7 = facturas.find((f) => f.numero === 'RHD 7'), f13 = facturas.find((f) => f.numero === 'RHD 13');
    notas_fe.push(
      { id: 'nc-1', tipo: 'NC', numero: 'NC 1', factura: f7.id, concepto: '3', motivo: 'Descuento comercial por pronto pago aprobado por la gerencia (dato de prueba).', lineas: [{ descripcion: 'DESCUENTO COMERCIAL POR PRONTO PAGO', unidad: '94', cantidad: 1, unitario: 10000, base: 10000, iva_pct: 19, iva: 1900, total: 11900 }], subtotal: 10000, iva: 1900, total: 11900, estado: 'validada', solicitada_por: 'Lucrecia', solicitada_en: '2026-10-05 09:15', aprobada_por: 'Diego', aprobada_en: '2026-10-05 11:40', enviada_en: '2026-10-05 11:41', validada_en: '2026-10-05 11:42', asiento: 'ap-mcfv-2026-10-001', entrega: { medio: 'correo', estado: 'enviado', en: '2026-10-05 11:43', destino: cliente(f7.cliente).email } },
      { id: 'nc-2', tipo: 'NC', numero: 'NC 2', factura: f13.id, concepto: '2', motivo: 'Anulación: el cobro fijo del Consultorio de Prueba empieza en noviembre, no en octubre (dato de prueba).', lineas: f13.lineas_fe.map((l) => ({ ...l })), subtotal: f13.subtotal, iva: f13.iva, total: f13.total, estado: 'por_aprobar', solicitada_por: 'Lucrecia', solicitada_en: '2026-10-21 17:05', aprobada_por: '', aprobada_en: '', enviada_en: '', validada_en: '', asiento: null, entrega: null },
    );
    notas_fe.forEach((n) => { const fa = factura(n.factura); n.cliente = fa.cliente; n.periodo = fa.periodo; n.cude = n.estado === 'validada' ? cufePrueba(n.numero + '|cude') : ''; n.cude_prueba = true; n.concepto_txt = (n.tipo === 'NC' ? CONCEPTOS_NC : CONCEPTOS_ND)[n.concepto] || ''; });

    // --- lotes de emisión ---------------------------------------------------------------------
    const lotes = [
      { id: 'L-2026-09-001', periodo: '2026-09', creado_en: '2026-09-23 08:14', por: 'Lucrecia', facturas: ['f-rhd-1'], resultado: '1 validada' },
      { id: 'L-2026-09-002', periodo: '2026-09', creado_en: L1, por: 'Lucrecia', facturas: facturas.filter((f) => f.lote === 'L-2026-09-002').map((f) => f.id), resultado: '10 validadas y 1 rechazada (RHD 2, reenviada y validada a las 08:46)' },
      { id: 'L-2026-10-001', periodo: '2026-10', creado_en: '2026-10-20 10:40', por: 'Lucrecia', facturas: ['f-rhd-13'], resultado: '1 validada' },
      { id: 'L-2026-10-002', periodo: '2026-10', creado_en: '2026-10-21 16:14', por: 'Lucrecia', facturas: ['f-rhd-14'], resultado: '1 en contingencia' },
    ];
    lotes.forEach((l) => { l.total = r2(l.facturas.reduce((a, id) => a + factura(id).total, 0)); });

    // --- eventos RADIAN y título valor ------------------------------------------------------------
    // La aceptación tácita (034) procede si el cliente no acepta ni reclama dentro de los 3 días hábiles siguientes al 032.
    function radian(f, hoy = HOY) {
      const ev = (k) => (f.eventos || []).find((e) => e.codigo === k) || null;
      const e30 = ev('030'), e31 = ev('031'), e32 = ev('032'), e33 = ev('033'), e34 = ev('034');
      let tacita = null;
      if (e32 && !e33 && !e31) {
        const plazo = sumarHabiles(e32.en, 3); const desde = sumarDias(plazo, 1);
        tacita = { plazo, desde, disponible: !e34 && hoy >= desde, registrada: !!e34, faltan: hoy <= plazo ? diasHabilesEntre(hoy, plazo) + (esHabil(hoy) ? 1 : 0) : 0 };
      }
      const aceptada = e33 || e34;
      const notas_permitidas = f.estado_dian === 'validada' && !aceptada;
      const titulo = aceptada && e30 && e32 ? 'completo' : (e30 ? 'en_curso' : 'sin_eventos');
      return { e30, e31, e32, e33, e34, tacita, aceptada: !!aceptada, notas_permitidas, titulo, motivo_sin_notas: aceptada ? `La factura ya tiene ${e33 ? 'aceptación expresa (033)' : 'aceptación tácita (034)'}: la DIAN no admite notas crédito ni débito después de la aceptación.` : (f.estado_dian !== 'validada' ? 'La factura todavía no está validada por la DIAN.' : '') };
    }
    const TITULO_LABEL = { completo: 'Título valor completo', en_curso: 'Eventos en curso', sin_eventos: 'Sin eventos del cliente' };

    // --- prefacturas (FEV-05): una por cierre del periodo -----------------------------------------
    function prefactura(clienteId, periodoId) {
      const ci = cierreDe(clienteId, periodoId); if (!ci) return null;
      const c = cliente(clienteId); const cz = cierreCliente(clienteId, periodoId); if (!cz.factura) return null;
      const ls = lineas(cz); const tt = totales(ls); const fis = fiscalEstado(c); const f = facturaDe(clienteId, periodoId);
      const t = tarifaVigente(c, cz.periodo.fin); const plazo = plazoDias(t);
      const fecha = f ? f.fecha : HOY;
      return {
        id: `pf-${clienteId}-${periodoId}`, numero: `PF ${ci.rh}`, cliente: c, periodo: cz.periodo, cierre: ci, cz, rh: ci.rh, lineas: ls, ...tt,
        diferencia: r2(tt.total - cz.factura.total), fiscal: fis, factura: f, estado: f ? f.estado_dian : (fis.completo ? 'borrador' : 'bloqueada'),
        creada_en: masMin(ci.cerrado_en, ci.cliente === 'c-cofema' ? 4 : 2), revisada: !!f, revisada_en: f ? f.revisada_en : '',
        forma_pago: plazo ? `Crédito ${plazo} días` : 'Contado', medio_pago: plazo ? 'Por confirmar' : 'Efectivo', fecha, vence: sumarDias(fecha, plazo), esquema: cz.factura.esquema,
        notas_doc: notasDocumento(cz, ci.rh), dato_prueba: true,
      };
    }
    function prefacturas(periodoId) {
      return clientes.filter((c) => cierreDe(c.id, periodoId)).map((c) => prefactura(c.id, periodoId)).filter(Boolean)
        .sort((a, b) => (a.factura ? a.factura.consecutivo : 1e6) - (b.factura ? b.factura.consecutivo : 1e6) || a.creada_en.localeCompare(b.creada_en));
    }
    // Resolución activa y alertas (cuando quede el 10 % del rango o falten 60 días para el vencimiento)
    function numeracion(res = resoluciones[0], usados = facturas.filter((f) => f.prefijo === res.prefijo).length) {
      const total = res.hasta - res.desde + 1; const pct = Math.round(usados / total * 1000) / 10;
      const dias = Math.round((parseISO(res.vigente_hasta) - parseISO(HOY)) / 86400000);
      const alertas = [];
      if (pct >= config.alerta_pct) alertas.push(`Se ha usado el ${pct} % del rango`);
      if (dias <= config.alerta_dias) alertas.push(`El rango vence en ${dias} días (${fmtFecha(res.vigente_hasta)})`);
      return { res, usados, total, pct, dias, siguiente: res.desde + usados, alertas };
    }

    // --- movimiento contable de facturas y notas hacia Helisa (MC-FV, libros F y N) ----------------------------------
    // Por documento y por libro: débito 1305 por el total; crédito ingreso por concepto; crédito IVA con base. Notas crédito: al revés.
    function movimientoDocumento(doc, pl) {
      const esNota = !!doc.tipo; const f = esNota ? factura(doc.factura) : doc; const c = cliente(f.cliente);
      const nat = (n) => (esNota && doc.tipo === 'NC' ? (n === 'D' ? 'C' : 'D') : n);
      const ls = esNota ? doc.lineas : f.lineas_fe; const subtotal = esNota ? doc.subtotal : f.subtotal; const iva = esNota ? doc.iva : f.iva; const total = esNota ? doc.total : f.total;
      const fecha = esNota ? (doc.validada_en || doc.solicitada_en).slice(0, 10) : f.fecha;
      const docFuente = (esNota ? doc.numero : f.numero).replace(/\s/g, '');
      const cruce = esNota ? f.numero.replace(/\s/g, '') : docFuente;
      const filas = []; let deb = 0, cre = 0;
      ['F', 'N'].forEach((libro) => {
        let orden = 0;
        const add = (uso, concepto, cta, valor, naturaleza, base) => {
          orden++;
          const ctx = { 'plantilla.tipo_documento': esNota ? doc.tipo : pl.tipo_documento, 'documento.fecha': fmtFechaPlano(fecha, pl.formato_fecha), 'documento.numero': String(esNota ? doc.numero.replace(/\D/g, '') : f.consecutivo), 'linea.cuenta': cta, 'linea.concepto': concepto, 'plantilla.centro_costo': pl.centro_costo, 'linea.valor': fmtValorPlano(valor, pl), 'linea.naturaleza': naturaleza, 'cliente.nit': c.nit, 'documento.doc_fuente': uso === 'cartera' ? cruce : docFuente, 'documento.forma_pago': uso === 'cartera' ? (/Crédito/.test(f.forma_pago || '') ? '6' : '1') : '', 'linea.base': base ? fmtValorPlano(base, pl) : '', 'linea.clase': libro, 'linea.orden': String(orden) };
          const fila = {}; pl.columnas.forEach((col) => { let v = ''; if (col.origen === 'campo') v = ctx[col.campo] ?? ''; else if (col.origen === 'constante') v = col.constante; fila[col.titulo] = textoPlano(v, pl); });
          filas.push({ fila, libro, uso, valor, naturaleza, doc: `${esNota ? doc.numero + ' (a ' + f.numero + ')' : f.numero} · ${c.nombre_comercial}` });
          if (libro === 'F') { if (naturaleza === 'D') deb += valor; else cre += valor; }
        };
        add('cartera', `${esNota ? (doc.tipo === 'NC' ? 'NOTA CREDITO' : 'NOTA DEBITO') : 'FACTURA'} ${docFuente} ${c.razon_social}`, cuenta('cartera', libro), total, nat('D'));
        ls.forEach((l) => add('ingreso', l.descripcion, cuenta('ingreso', libro, l.codigo || 'RES-BAS'), l.base, nat('C')));
        if (iva) add('iva', `IVA ${ls[0] ? ls[0].iva_pct : 19}%`, cuenta('iva', libro), iva, nat('C'), subtotal);
      });
      return { filas, deb: r2(deb), cre: r2(cre) };
    }
    function generarMovimiento(pl, docs) {
      const out = { filas: [], documentos: 0, debitos: 0, creditos: 0, errores: [] };
      docs.forEach((d) => { const r = movimientoDocumento(d, pl); out.filas.push(...r.filas); out.documentos++; out.debitos = r2(out.debitos + r.deb); out.creditos = r2(out.creditos + r.cre); if (Math.abs(r.deb - r.cre) > 0.005) out.errores.push(`${d.numero}: débitos ≠ créditos`); });
      return out;
    }
    return { ESTADO, CLASE, EVENTOS, CONCEPTOS_NC, CONCEPTOS_ND, TITULO_LABEL, proveedores, config, emisor, resoluciones, conceptos, cuentas, cuenta, lotes, notas: notas_fe, FESTIVOS,
      lineas, totales, notasDocumento, prefactura, prefacturas, radian, numeracion, sumarHabiles, esHabil, diasHabilesEntre, qrUrl, masMin, movimientoDocumento, generarMovimiento, cufe: cufePrueba,
      emitidas: (periodoId) => facturas.filter((f) => f.prefijo === 'RHD' && (!periodoId || f.periodo === periodoId)).sort((a, b) => a.consecutivo - b.consecutivo),
      notasDe: (facturaId) => notas_fe.filter((n) => n.factura === facturaId) };
  })();

  // --- Plantillas y archivos de movimiento contable hacia Helisa (PROPUESTA 2) ----------------------------------
  // El archivo FV de la v5 («para que Helisa genere la factura») no aplica: Helisa no importa facturas. Su plantilla de
  // 22 columnas se adapta como MOVIMIENTO CONTABLE de la factura que emite el sistema (MC-FV), en los libros F y N.
  plantillas_plano.forEach((p) => { if (p.tipo === 'FV') { p.estado = 'retirada'; p.nota_cambio = 'v5: archivo FV para que Helisa generara la factura. Helisa no importa facturas: en la propuesta 2 se reemplaza por el movimiento contable MC-FV.'; } });
  plantillas_plano.push(
    { id: 'pl-mcfv-2', tipo: 'MCFV', version: 2, nombre: 'Movimiento contable de facturas y notas · libros F y N (22 columnas de la v5)', estado: 'aprobada', vigente_desde: '2026-09-21', aprobada_por: 'Diego', aprobada_en: '2026-09-21 16:30', creada_por: 'Equipo RH digital', creada_en: '2026-09-18', nota_cambio: 'Plantilla FV de la v5 adaptada: tipo de documento contable FV (por confirmar con Julio), DOC FUENTE = prefijo y número de la factura electrónica, una línea de ingreso por concepto, IVA con base y cartera 1305, repetidas en el libro N. Cuentas de EJEMPLO: las reales salen de la plantilla «servicio → cuenta» que entregará Julio.',
      formato: 'csv', separador: ';', codificacion: 'windows-1252', con_titulos: true, formato_fecha: 'dd/MM/yyyy', decimales: 2, separador_decimal: ',', mayusculas: true, quitar_tildes: true, tipo_documento: 'FV', centro_costo: '0101', prefijo_doc_fuente: '', nit_con_dv: false, agrupacion: 'lote', prefijo_archivo: 'COMSERVA', valida_cuadre: true, valida_tercero: true, valida_fve: false,
      columnas: colsHelisa(), lineas: [] },
    { id: 'pl-rc-2', tipo: 'RC', version: 2, nombre: 'Recibo de caja · libros F y N', estado: 'aprobada', vigente_desde: '2026-10-21', aprobada_por: 'Diego', aprobada_en: '2026-10-21 17:30', creada_por: 'Equipo RH digital', creada_en: '2026-10-21', nota_cambio: 'Agrega las líneas del libro N (la cuenta de caja del libro N queda POR CONFIRMAR con Julio). DOC FUENTE = prefijo y número de la factura que se cruza (RHD…). Tipo de recibo RC1 o RC2: por confirmar.',
      formato: 'csv', separador: ';', codificacion: 'windows-1252', con_titulos: true, formato_fecha: 'dd/MM/yyyy', decimales: 2, separador_decimal: ',', mayusculas: true, quitar_tildes: true, tipo_documento: 'RC', centro_costo: '0101', prefijo_doc_fuente: '', nit_con_dv: false, agrupacion: 'periodo', recibos_incluidos: 'entregados', prefijo_archivo: 'COMSERVA', valida_cuadre: true, valida_tercero: true, valida_fve: true,
      columnas: colsHelisa(),
      lineas: [
        { orden: 1, tipo: 'caja', clase: 'F', cuenta: '110505', naturaleza: 'D', concepto: 'RECIBO PROVISIONAL {recibo.numero} {recibo.tipo}', base: false, tercero: true, omitir_cero: false },
        { orden: 2, tipo: 'cartera', clase: 'F', cuenta: '130505', naturaleza: 'C', concepto: 'ABONO A {aplicacion.factura_numero}', base: false, tercero: true, omitir_cero: false },
        { orden: 3, tipo: 'caja', clase: 'N', cuenta: 'POR CONFIRMAR', naturaleza: 'D', concepto: 'RECIBO PROVISIONAL {recibo.numero} {recibo.tipo}', base: false, tercero: true, omitir_cero: false },
        { orden: 4, tipo: 'cartera', clase: 'N', cuenta: '112050502', naturaleza: 'C', concepto: 'ABONO A {aplicacion.factura_numero}', base: false, tercero: true, omitir_cero: false },
      ] },
  );
  archivos_plano.forEach((x) => { if (x.tipo === 'RC') { x.nombre = x.nombre.replace(/\.xls$/, '.csv'); x.sha256 = hashFake(x.nombre + x.generado_en); } }); // P2: los movimientos contables van en CSV
  plantillas_plano.forEach((p) => { if (p.id === 'pl-rc-1') { p.estado = 'retirada'; p.nota_cambio += ' Reemplazada el 21/10 por la v2 (libros F y N).'; } });
  for (let i = archivos_plano.length - 1; i >= 0; i--) if (archivos_plano[i].tipo === 'FV') archivos_plano.splice(i, 1);
  const rhd = (a, b) => facturas.filter((f) => f.prefijo === 'RHD' && f.consecutivo >= a && f.consecutivo <= b).map((f) => f.id);
  archivos_plano.push(
    { id: 'ap-mcfv-2026-09-001', tipo: 'MCFV', periodo: '2026-09', plantilla: 'pl-mcfv-2', consecutivo: 1, nombre: 'COMSERVA_MCFV_2026-09_001.csv', estado: 'importado', generado_por: 'Lucrecia', generado_en: '2026-09-23 08:40', descargado_en: '2026-09-23 08:41', importado_en: '2026-09-23 09:05', importado_por: 'Lucrecia', facturas: rhd(1, 1), notas: [], nota: 'Asiento de la RHD 1 de Cofema en los libros F y N.' },
    { id: 'ap-mcfv-2026-09-002', tipo: 'MCFV', periodo: '2026-09', plantilla: 'pl-mcfv-2', consecutivo: 2, nombre: 'COMSERVA_MCFV_2026-09_002.csv', estado: 'rechazado', generado_por: 'Lucrecia', generado_en: '2026-09-28 08:50', descargado_en: '2026-09-28 08:51', rechazado_en: '2026-09-28 09:05', errores: 'Documento RHD 2: el tercero 900555017 (El Trébol) no existe en Helisa.\nSe creó el tercero en Helisa y se regeneró el archivo.', facturas: rhd(2, 12), notas: [] },
    { id: 'ap-mcfv-2026-09-003', tipo: 'MCFV', periodo: '2026-09', plantilla: 'pl-mcfv-2', consecutivo: 3, nombre: 'COMSERVA_MCFV_2026-09_003.csv', estado: 'importado', generado_por: 'Lucrecia', generado_en: '2026-09-28 09:22', descargado_en: '2026-09-28 09:23', importado_en: '2026-09-28 09:40', importado_por: 'Lucrecia', facturas: rhd(2, 12), notas: [], nota: '11 facturas (RHD 2 a RHD 12); El Trébol ya existe como tercero.' },
    { id: 'ap-mcfv-2026-10-001', tipo: 'MCFV', periodo: '2026-10', plantilla: 'pl-mcfv-2', consecutivo: 1, nombre: 'COMSERVA_MCFV_2026-10_001.csv', estado: 'importado', generado_por: 'Lucrecia', generado_en: '2026-10-05 15:05', descargado_en: '2026-10-05 15:06', importado_en: '2026-10-05 15:20', importado_por: 'Lucrecia', facturas: [], notas: ['nc-1'], nota: 'Nota crédito NC 1 (reverso parcial de la RHD 7).' },
  );
  archivos_plano.filter((a) => a.tipo === 'MCFV').forEach((a) => {
    const pl = plantillas_plano.find((p) => p.id === a.plantilla);
    const g = fe.generarMovimiento(pl, a.facturas.map(factura).concat(a.notas.map((id) => notas_fe.find((n) => n.id === id))));
    Object.assign(a, { documentos: g.documentos, filas: g.filas.length, debitos: g.debitos, creditos: g.creditos, sha256: hashFake(a.nombre + a.generado_en) });
  });
  // El recibo de Sonrisas (35680) cruza la RHD 5; el archivo RC de octubre lo lleva.
  clientes.forEach((c) => { c.fiscal.completo = fiscalEstado(c).completo; });

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
          detalle: [['Modalidad', ped.via === 'conekta' ? '1B · Helisa Conekta (API)' : '1A · archivo plano (TXT con «|», ANSI)'], ['Líneas', lineas], ['Subtotal del pedido', fmtCOP(ped.subtotal)], ['Código del cliente en Helisa', `${x.c.helisa.codigo_cliente || 'falta'} (${x.c.helisa.codigo_estado})`], ['Lista de precio', `${helisa.lista_precio.codigo} · ${helisa.lista_precio.nombre}`], ['Centro de costo · negocio · vendedor', `${helisa.centro_costo.codigo} · ${helisa.negocio.codigo} · ${helisa.vendedor.identidad}`]],
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
          detalle: [['Contenido', 'Débito a caja o bancos, crédito a cartera 1305 con la factura que se cruza'], ['Libros', 'Contable y tributario (líneas F y N, por confirmar con Julio)'], ['Tipo de recibo en Helisa', helisa.tipo_recibo.codigo + ' (por confirmar)']],
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
  // PROPUESTA 2 · TRAZABILIDAD CON FACTURA ELECTRÓNICA
  // visitas → cierre → RH → prefactura → factura electrónica (CUFE, estado DIAN) → entrega y eventos RADIAN
  // → asiento contable en Helisa → recibos → asiento del recibo (RC) → cruce en Helisa
  // =====================================================================
  (function () {
    const T = traza;
    T.propuesta = 'P2';
    const corto = (n) => String(n || '').split(' ').slice(0, 2).join(' ');
    // Quién generó un evento RADIAN: el nombre completo del cliente o «Comserva», sin la aclaración entre paréntesis
    const quienEvento = (n) => String(n || '').replace(/\s*\(.*$/, '');
    const cant = (l) => (l.unidad === 'KGM' ? fmtKg(l.cantidad) + ' kg' : fmtNum(l.cantidad));
    Object.assign(T.tipos.prefactura, { etiqueta: 'Prefactura', corto: 'Prefactura', grupo: 'Oficina', falta: 'La prefactura sale del cierre del cliente' });
    Object.assign(T.tipos.fe, { etiqueta: 'Factura electrónica', corto: 'Factura', grupo: 'DIAN', falta: 'Falta emitir la factura electrónica' });
    Object.assign(T.tipos.envio, { etiqueta: 'Entrega y eventos RADIAN', corto: 'Entrega', grupo: 'DIAN', falta: 'La factura se entrega cuando la DIAN la valida' });
    Object.assign(T.tipos.asiento, { etiqueta: 'Asiento contable en Helisa', corto: 'Asiento', grupo: 'Helisa', falta: 'Falta contabilizar la factura en Helisa' });
    Object.assign(T.tipos.recibos, { falta: 'El recibo se habilita cuando la DIAN valida la factura' });
    Object.assign(T.tipos.rc, { etiqueta: 'Asiento del recibo (RC)', corto: 'Asiento RC' });
    T.columnas.P2 = [
      { clave: 'visitas', etiqueta: 'Visitas', tipos: ['visitas'] }, { clave: 'cierre', etiqueta: 'Cierre', tipos: ['cierre'] }, { clave: 'rh', etiqueta: 'RH', tipos: ['rh'] },
      { clave: 'fe', etiqueta: 'Factura electrónica', tipos: ['prefactura', 'fe'] }, { clave: 'envio', etiqueta: 'Entrega y RADIAN', tipos: ['envio'] }, { clave: 'asiento', etiqueta: 'Asiento Helisa', tipos: ['asiento'] },
      { clave: 'recibos', etiqueta: 'Recibos', tipos: ['recibos'] }, { clave: 'cruce', etiqueta: 'Cruce', tipos: ['rc', 'cruce'] },
    ];
    const fsf = T.filtros.find((x) => x.clave === 'sin_factura'); if (fsf) fsf.etiqueta = 'Sin factura validada';
    // TRZ-04 (Fase 2): filtro «sin asiento»: factura validada por la DIAN cuyo asiento todavía no está importado en Helisa
    T.filtros.splice(T.filtros.findIndex((x) => x.clave === 'sin_factura') + 1, 0, { clave: 'sin_asiento', etiqueta: 'Sin asiento en Helisa', test: (f) => { const e = (t) => (f.cadena.eslabones.find((x) => x.tipo === t) || {}).estado; return e('fe') === 'ok' && e('asiento') !== 'ok'; } });
    const cufe1 = (facturas.find((f) => f.numero === 'RHD 1') || {}).cufe || '';
    Object.assign(T.textos, {
      intro: 'Siga cada servicio desde la visita en campo hasta el cruce del pago en Helisa, pasando por la factura electrónica: prefactura, validación de la DIAN con su CUFE, entrega al cliente con los eventos RADIAN y asiento contable en Helisa. Cada eslabón guarda estado, fecha y hora, usuario, documento y huella (hash o CUFE); lo que falta se ve punteado.',
      modalidad: 'Propuesta 2 · factura electrónica por proveedor tecnológico (simulado; ambiente de pruebas; prefijo RHD de prueba). La contabilidad va a Helisa por archivo plano; Helisa Conekta es opcional.',
      ejemplos: ['RHD 1', '22690-26', 'RHD 14', 'NC 1', cufe1.slice(0, 10), '1118', '35672', 'RC 8815', 'COMSERVA_MCFV_2026-09_002'],
      atajos: [['c-cofema|2026-09', 'Cofema · septiembre (ejemplo principal: RHD 1, mismo total que la FVE 25756; abono de prueba 35672, saldo $1.744.935)'], ['c-sonrisas|2026-09', 'Cadena completa hasta el cruce'], ['c-trebol|2026-09|fe', 'Factura rechazada y reenviada'], ['c-prueba-kg|2026-10|fe', 'Factura en contingencia'], ['c-pielviva|2026-10|prefactura', 'Prefactura bloqueada por datos fiscales'], ['c-huellas|2026-09|fe', 'Nota crédito NC 1'], ['c-tinta|2026-09|recibos', 'Recibo anulado']],
      buscador: 'Buscar por número: constancia, planilla, prefactura, factura (RHD) o CUFE, nota, recibo, archivo',
      vacio: 'Pruebe con un número de constancia (1118), planilla (22690-26), factura (RHD 1), nota (NC 1), recibo (35672 o 35680), recibo definitivo (RC 8815 o RC 8851), nombre de archivo o los primeros caracteres de un CUFE o una huella.',
    });

    T.constructores.prefactura = (x) => {
      const pf = fe.prefactura(x.c.id, x.p.id); if (!pf) return null;
      const h = hashFake(`prefactura|${x.c.id}|${x.p.id}`);
      const lineasTxt = pf.lineas.map((l) => `${l.descripcion}: ${cant(l)} × ${fmtCOP(l.unitario)} + IVA ${fmtCOP(l.iva)}`).join(' · ');
      const ev = [{ en: pf.creada_en, quien: 'Sistema', accion: 'Generó la prefactura desde el cierre', detalle: `${pf.lineas.length} línea${pf.lineas.length === 1 ? '' : 's'} · ${fmtCOP(pf.total)} · diferencia con el RH ${fmtCOP(pf.diferencia)}`, nivel: 'ok' }];
      if (pf.estado === 'bloqueada') {
        ev.push({ en: masMinTrz(pf.creada_en, 2), quien: 'Sistema', accion: 'Bloqueó la prefactura: sin datos fiscales no se factura', detalle: pf.fiscal.texto, nivel: 'alerta' });
        return { estado: 'alerta', alerta: true, numero: pf.numero, sub: `${fmtCOP(pf.total)} · bloqueada por datos fiscales`, aviso: `Sin datos fiscales completos no se factura. Falta: ${pf.fiscal.faltan.map((i) => `${i.etiqueta.toLowerCase()} (${i.valor})`).join('; ')}.`, fecha: pf.creada_en, usuario: 'Sistema', hash: h,
          docs: [{ nombre: 'Prefactura (borrador de la factura)', numero: pf.numero, fecha: pf.creada_en, hash: h, href: `facturacion.html#prefacturas|${x.p.id}|${x.c.id}`, nota: 'Bloqueada' }],
          detalle: [['Líneas', lineasTxt], ['Total', fmtCOP(pf.total)], ['Datos fiscales', pf.fiscal.items.map((i) => `${i.ok ? '✓' : '✗'} ${i.etiqueta}`).join(' · ')]],
          enlace: { href: `clientes.html#${x.c.id}|fiscal`, texto: 'Completar los datos fiscales' }, eventos: ev };
      }
      if (pf.revisada) ev.push({ en: pf.revisada_en, quien: 'Lucrecia', accion: 'Revisó la prefactura y la dejó lista para emitir', nivel: 'ok' });
      return {
        estado: pf.revisada ? 'ok' : 'curso', numero: pf.numero, sub: `${fmtCOP(pf.total)} · ${pf.diferencia === 0 ? 'igual al RH' : 'difiere del RH en ' + fmtCOP(pf.diferencia)}${pf.revisada ? '' : ' · por revisar'}`,
        fecha: pf.revisada ? pf.revisada_en : pf.creada_en, usuario: pf.revisada ? 'Lucrecia' : 'Sistema', hash: h,
        docs: [{ nombre: 'Prefactura (borrador de la factura)', numero: pf.numero, fecha: pf.creada_en, hash: h, href: `facturacion.html#prefacturas|${x.p.id}|${x.c.id}` }],
        detalle: [['Líneas', lineasTxt], ['Subtotal · IVA por línea · total', `${fmtCOP(pf.subtotal)} · ${fmtCOP(pf.iva)} · ${fmtCOP(pf.total)}`], ['Comparación con el RH', pf.diferencia === 0 ? 'Diferencia $0' : 'Diferencia ' + fmtCOP(pf.diferencia)], ['Datos fiscales del cliente', 'Completos (6 de 6)'], ['Forma de pago', `${pf.forma_pago}${pf.forma_pago === 'Contado' ? '' : ' · vence ' + fmtFechaCorta(pf.vence)}`], ['Notas de la factura', pf.notas_doc.join(' · ')]],
        enlace: { href: `facturacion.html#prefacturas|${x.p.id}|${x.c.id}`, texto: 'Ver en Facturación electrónica' }, eventos: ev,
      };
    };
    const masMinTrz = (fh, n) => fe.masMin(fh, n);

    T.constructores.fe = (x) => {
      const f = x.factura; if (!f || !f.estado_dian) return null;
      const st = { validada: 'ok', enviada: 'curso', contingencia: 'curso', rechazada: 'alerta', anulada: 'alerta' }[f.estado_dian] || 'curso';
      const notas = fe.notasDe(f.id);
      const ev = [{ en: f.enviada_en, quien: 'Lucrecia', accion: `Emitió el lote ${f.lote}`, detalle: `${f.numero} · ${fmtCOP(f.total)} · proveedor simulado`, nivel: 'ok' }];
      if (f.rechazo) ev.push({ en: f.rechazo.en, quien: 'DIAN (simulado)', accion: `Rechazó la ${f.numero}`, detalle: f.rechazo.motivo, nivel: 'alerta' }, { en: f.rechazo.corregido_en, quien: 'Lucrecia', accion: 'Corrigió los datos y reenvió con el mismo número', detalle: f.rechazo.correccion, nivel: 'ok' });
      if (f.contingencia) ev.push({ en: f.contingencia.en, quien: 'Proveedor (simulado)', accion: 'Puso la factura en contingencia', detalle: f.contingencia.motivo, nivel: 'curso' });
      if (f.validada_en) ev.push({ en: f.validada_en, quien: 'DIAN (simulado)', accion: `Validó la ${f.numero}`, detalle: `CUFE de prueba ${f.cufe.slice(0, 12)}…`, nivel: 'ok' });
      notas.forEach((n) => {
        ev.push({ en: n.solicitada_en, quien: corto(n.solicitada_por), accion: `Solicitó la ${n.tipo === 'NC' ? 'nota crédito' : 'nota débito'} ${n.numero}`, detalle: `${n.concepto_txt} · ${fmtCOP(n.total)}`, nivel: 'curso' });
        if (n.aprobada_en) ev.push({ en: n.aprobada_en, quien: corto(n.aprobada_por), accion: `Aprobó la ${n.numero} (Gerencia)`, nivel: 'ok' });
        if (n.validada_en) ev.push({ en: n.validada_en, quien: 'DIAN (simulado)', accion: `Validó la ${n.numero}`, detalle: `CUDE de prueba ${n.cude.slice(0, 12)}…`, nivel: 'ok' });
      });
      const pend = notas.filter((n) => n.estado === 'por_aprobar');
      const aviso = f.rechazo ? `Rechazada el ${fmtFechaCorta(f.rechazo.en)} a las ${f.rechazo.en.slice(11)} (rechazo simulado): ${f.rechazo.motivo} ${f.rechazo.correccion}`
        : (f.contingencia ? f.contingencia.motivo : (pend.length ? `${pend.map((n) => n.numero).join(', ')} por aprobar (Gerencia): ${pend[0].concepto_txt.toLowerCase()}.` : (notas.length ? `${notas.map((n) => `${n.numero} (${fe.ESTADO[n.estado].toLowerCase()})`).join(', ')}: saldo de referencia ${fmtCOP(x.saldo)}.` : '')));
      return {
        estado: st, alerta: !!f.rechazo, numero: f.numero, sub: `${fe.ESTADO[f.estado_dian]} · ${fmtCOP(f.total)}`,
        fecha: f.validada_en || f.enviada_en, usuario: 'Lucrecia', cufe: f.cufe, cufe_prueba: true,
        aviso, nivel_aviso: f.rechazo ? 'info' : (f.contingencia || pend.length ? 'alerta' : 'info'),
        docs: [
          { nombre: `Representación gráfica (PDF) · ${f.numero}`, numero: f.numero, fecha: f.validada_en || f.enviada_en, hash: 'CUFE ' + f.cufe, href: `../documentos/factura-electronica.html#${f.id}` },
          { nombre: `XML firmado UBL 2.1 · ${f.numero}`, numero: `${f.numero.replace(' ', '')}.xml`, fecha: f.enviada_en, hash: f.hash_xml, href: `facturacion.html#xml|${f.id}` },
          ...(f.validada_en ? [{ nombre: 'Respuesta de la DIAN (ApplicationResponse)', numero: '', fecha: f.validada_en, hash: hashFake('ar|' + f.numero), nota: f.respuesta_dian }] : []),
          ...notas.map((n) => ({ nombre: `${n.tipo === 'NC' ? 'Nota crédito' : 'Nota débito'} ${n.numero}`, numero: n.numero, fecha: n.validada_en || n.solicitada_en, hash: n.cude ? 'CUDE ' + n.cude : '', href: `../documentos/nota-credito.html#${n.id}`, estado: fe.ESTADO[n.estado] })),
        ],
        detalle: [['Estado DIAN', fe.ESTADO[f.estado_dian] + (f.validada_en ? ` el ${fmtFechaCorta(f.validada_en)} a las ${f.validada_en.slice(11)}` : '')], ['Lote', f.lote], ['Líneas', (f.lineas_fe || []).map((l) => `${l.descripcion}: ${cant(l)} × ${fmtCOP(l.unitario)}`).join(' · ')], ['Subtotal · IVA · total', `${fmtCOP(f.subtotal)} · ${fmtCOP(f.iva)} · ${fmtCOP(f.total)}`], ['Forma de pago', `${f.forma_pago}${f.forma_pago === 'Contado' ? '' : ' · vence ' + fmtFecha(f.vence)}`], ['Proveedor y ambiente', 'Proveedor tecnológico simulado (por elegir) · ambiente de pruebas · prefijo RHD de prueba'], ['Notas crédito o débito', notas.length ? notas.map((n) => `${n.numero} · ${fmtCOP(n.total)} · ${fe.ESTADO[n.estado]}`).join(' · ') : 'Sin notas']],
        enlace: { href: `facturacion.html#emitidas|${f.id}`, texto: 'Ver en Facturación electrónica' },
        buscar: [f.cufe, ...notas.map((n) => n.numero), ...notas.map((n) => n.cude).filter(Boolean)],
        eventos: ev,
      };
    };

    const ENTREGA_TXT = { enviado: 'Correo enviado', rebotado: 'Correo rebotado', entregada: 'Entregada impresa', pendiente: 'Pendiente de entregar', en_espera: 'En espera' };
    T.constructores.envio = (x) => {
      const f = x.factura; if (!f || !f.estado_dian) return null;
      if (f.estado_dian !== 'validada') return { estado: 'pendiente', numero: 'En espera', sub: (f.entrega && f.entrega.nota) || 'Se entrega cuando la DIAN valide la factura' };
      const r = fe.radian(f); const en = f.entrega;
      const reentrega = en.estado === 'rebotado' && en.reentrega_en;
      const codigos = f.eventos.map((e) => e.codigo);
      const radianTxt = r.e34 ? 'aceptación tácita (034)' : (r.e33 ? 'aceptación expresa (033)' : (r.tacita ? (r.tacita.disponible ? `034 · opcional, por confirmar (la tácita se cumpliría el ${fmtFechaCorta(r.tacita.desde)})` : `plazo para aceptar o reclamar hasta el ${fmtFechaCorta(r.tacita.plazo)}; la tácita se cumpliría el ${fmtFechaCorta(r.tacita.desde)}`) : (r.e30 ? 'acuse de recibo; falta el recibo del servicio (032)' : 'sin eventos del cliente')));
      const estado = en.estado === 'pendiente' ? 'curso' : 'ok';
      const ev = [];
      if (en.medio === 'correo') ev.push({ en: en.en, quien: 'Proveedor (simulado)', accion: en.estado === 'rebotado' ? 'El correo de la factura rebotó' : 'Envió la factura al correo de recepción del cliente', detalle: en.estado === 'rebotado' ? en.nota : `ZIP con el XML (AttachedDocument) y el PDF · ${en.destino}`, nivel: en.estado === 'rebotado' ? 'alerta' : 'ok' });
      if (reentrega) ev.push({ en: en.reentrega_en, quien: 'Operario', accion: 'Entregó la factura impresa en la visita', nivel: 'ok' });
      if (en.medio === 'impresa' && en.en) ev.push({ en: en.en, quien: 'Operario', accion: 'Entregó la factura impresa en la visita', detalle: en.nota, nivel: 'ok' });
      f.eventos.forEach((e) => ev.push({ en: e.en, quien: quienEvento(e.por), accion: `Evento RADIAN ${e.codigo} · ${fe.EVENTOS[e.codigo].etiqueta.toLowerCase()}`, nivel: 'ok' }));
      return {
        estado, alerta: en.estado === 'rebotado', numero: codigos.length ? codigos.join(' · ') : ENTREGA_TXT[en.estado] || 'Entrega', sub: `${reentrega ? 'Correo rebotado; entregada impresa' : ENTREGA_TXT[en.estado]} · ${radianTxt}`,
        aviso: en.estado === 'pendiente' ? en.nota : (en.estado === 'rebotado' ? en.nota : ''), nivel_aviso: en.estado === 'rebotado' ? 'alerta' : 'info',
        fecha: (f.eventos.length ? f.eventos[f.eventos.length - 1].en : en.en) || '', usuario: f.eventos.length ? quienEvento(f.eventos[f.eventos.length - 1].por) : (en.medio === 'impresa' ? 'Operario' : 'Proveedor'), hash: en.estado === 'pendiente' ? '' : f.hash_zip,
        docs: [...(en.medio === 'correo' ? [{ nombre: 'Correo con el ZIP (XML AttachedDocument y PDF)', numero: '', fecha: en.en, hash: f.hash_zip, nota: ENTREGA_TXT[en.estado] }] : []), ...f.eventos.map((e) => ({ nombre: `Evento RADIAN ${e.codigo} · ${fe.EVENTOS[e.codigo].etiqueta}`, numero: e.codigo, fecha: e.en, hash: hashFake(`radian|${f.numero}|${e.codigo}`) }))],
        detalle: [['Medio de entrega', en.medio === 'correo' ? `Correo de recepción${en.destino ? ' · ' + en.destino : ''}` : 'Impresa (el cliente no informó correo)'], ['Estado de la entrega', `${ENTREGA_TXT[en.estado]}${en.en ? ' · ' + fmtFechaCorta(en.en) + ' ' + en.en.slice(11) : ''}`], ['030 · Acuse de recibo', r.e30 ? fmtFechaCorta(r.e30.en) + ' ' + r.e30.en.slice(11) : '—'], ['032 · Recibo del servicio', r.e32 ? fmtFechaCorta(r.e32.en) + ' ' + r.e32.en.slice(11) : '—'], ['033 / 034 · Aceptación', r.e33 ? `Expresa (033) · ${fmtFechaCorta(r.e33.en)}` : (r.e34 ? `Tácita (034) · ${fmtFechaCorta(r.e34.en)} · ${r.e34.por}` : (r.tacita ? `034 · opcional, por confirmar: la tácita se cumpliría el ${fmtFechaCorta(r.tacita.desde)} (3 días hábiles después del 032 sin aceptación ni reclamo); no se registra mientras Comserva no lo necesite` : '—'))], ['Título valor', fe.TITULO_LABEL[r.titulo]], ['Notas crédito o débito', r.notas_permitidas ? 'Todavía se pueden emitir (sin aceptación registrada)' : r.motivo_sin_notas]],
        enlace: { href: `facturacion.html#radian|${f.id}`, texto: 'Ver eventos RADIAN' }, eventos: ev,
      };
    };

    T.constructores.asiento = (x) => {
      const f = x.factura; if (!f || !f.estado_dian) return null;
      if (f.estado_dian !== 'validada') return { estado: 'pendiente', numero: 'Sin asiento', sub: 'Se contabiliza cuando la DIAN valide la factura' };
      const a = f.asiento ? archivos_plano.find((y) => y.id === f.asiento) : null;
      if (!a) return { estado: 'pendiente', numero: 'Sin asiento', sub: 'Falta generar el movimiento contable de la factura (MC-FV)' };
      const rech = archivos_plano.filter((y) => y.tipo === 'MCFV' && y.estado === 'rechazado' && (y.facturas || []).includes(f.id));
      const notasA = fe.notasDe(f.id).filter((n) => n.asiento).map((n) => ({ n, a: archivos_plano.find((y) => y.id === n.asiento) }));
      const ev = [];
      rech.forEach((y) => ev.push({ en: y.generado_en, quien: corto(y.generado_por), accion: `Generó el archivo ${y.nombre}`, nivel: 'ok' }, { en: y.rechazado_en, quien: corto(y.generado_por), accion: `Helisa rechazó el archivo ${y.nombre}`, detalle: y.errores.split('\n')[0], nivel: 'alerta' }));
      ev.push({ en: a.generado_en, quien: corto(a.generado_por), accion: `Generó el movimiento contable ${a.nombre}`, detalle: `${a.documentos} documento${a.documentos === 1 ? '' : 's'} · D = C = ${fmtCOP(a.debitos)} por libro`, nivel: 'ok' });
      if (a.importado_en) ev.push({ en: a.importado_en, quien: corto(a.importado_por), accion: 'Lo importó en Helisa (Importación de movimiento contable, módulo de cartera)', nivel: 'ok' });
      notasA.forEach(({ n, a: an }) => { if (an) ev.push({ en: an.importado_en || an.generado_en, quien: corto(an.generado_por), accion: `Contabilizó la ${n.numero} en ${an.nombre}`, nivel: an.importado_en ? 'ok' : 'curso' }); });
      return {
        estado: a.estado === 'importado' ? 'ok' : 'curso', alerta: rech.length > 0 && f.cliente === 'c-trebol', numero: a.nombre.replace(/^COMSERVA_|\.csv$/g, '').replace(/_/g, ' '),
        sub: a.estado === 'importado' ? 'Importado en Helisa · libros F y N' : 'Descargado · falta importarlo en Helisa',
        aviso: rech.length ? `El archivo ${rech[0].nombre} fue rechazado: ${rech[0].errores.split('\n')[0]} Se regeneró.` : '', nivel_aviso: f.cliente === 'c-trebol' ? 'alerta' : 'info',
        fecha: a.importado_en || a.generado_en, usuario: corto(a.importado_por || a.generado_por), hash: a.sha256,
        docs: [{ nombre: `Movimiento contable ${a.nombre}`, numero: a.nombre, fecha: a.generado_en, hash: a.sha256, href: `planos.html#${a.id}` }, ...notasA.filter((z) => z.a).map(({ n, a: an }) => ({ nombre: `Movimiento contable de la ${n.numero} · ${an.nombre}`, numero: an.nombre, fecha: an.generado_en, hash: an.sha256, href: `planos.html#${an.id}` }))],
        detalle: [['Asiento por libro', `D 1305 cartera ${fmtCOP(f.total)} · C ingreso por concepto ${fmtCOP(f.subtotal)} · C IVA ${fmtCOP(f.iva)} con base ${fmtCOP(f.subtotal)}`], ['Libros', 'F (tributario o fiscal) y N (contable NIIF), relacionados por el indicador fiscal'], ['Tipo de documento en Helisa', 'FV contable (por confirmar con Julio)'], ['DOC FUENTE', f.numero.replace(' ', '')], ['Cuentas', 'De ejemplo: la plantilla «servicio → cuenta» la entrega Julio (por confirmar)'], ['Canal', 'Archivo plano · Helisa Conekta opcional']],
        enlace: { href: `planos.html#${a.id}`, texto: 'Ver en Contabilidad en Helisa' }, buscar: [a.nombre, ...rech.map((y) => y.nombre)], eventos: ev,
      };
    };
    // Recibos y su asiento: solo con factura ACEPTADA por la DIAN
    const base = { recibos: T.constructores.recibos, rc: T.constructores.rc, cruce: T.constructores.cruce };
    ['recibos', 'rc', 'cruce'].forEach((k) => {
      T.constructores[k] = (x) => {
        if (x.factura && x.factura.estado_dian && x.factura.estado_dian !== 'validada') return k === 'recibos' ? { estado: 'pendiente', numero: 'Sin recibos', sub: 'El recibo se habilita cuando la DIAN valide la factura' } : null;
        const e = base[k](x);
        if (e && k === 'rc') { e.numero = String(e.numero || '').replace(/\.csv$/, ''); e.docs = (e.docs || []).map((d) => ({ ...d, nombre: d.nombre.replace('Archivo de movimiento contable', 'Movimiento contable del recibo') })); e.detalle = [['Contenido', 'Débito a caja o bancos y crédito a la cartera 1305 con la factura electrónica que se cruza (DOC FUENTE = RHD…)'], ['Libros', 'F y N (las cuentas del libro N, por confirmar con Julio)'], ['Tipo de recibo en Helisa', helisa.tipo_recibo.codigo + ' (por confirmar)']]; e.enlace = { href: 'planos.html#rc', texto: 'Ver recibos en Contabilidad' }; }
        return e;
      };
    });
  })();

  // Barra superior común de los mockups
  // v6: cada propuesta cambia DATA.mock.propuesta (p. ej. 'PROPUESTA 1') y la barra lo muestra
  const mock = { version: 'V6', propuesta: 'PROPUESTA 2' };
  function mockBar(active) {
    const links = [
      ['../index.html', 'Inicio'],
      ['../app/index.html', 'App móvil'],
      ['../panel/index.html', 'Panel web'],
      ['../panel/facturacion.html', 'Facturación electrónica'],
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
    mock, r2, ESQUEMA_TARIFA_LABEL, ESQUEMA_TARIFA_CORTO, fraseLiquidacion, tarifaResumen, helisa, equivalencias_helisa, equivalencia,
    cierres_cliente, cierreAnticipado, cierreDe, numeroRH, pedidos, pedidoDe, archivos_op, ESTADO_PEDIDO_LABEL, VIA_REGISTRO_LABEL, validacionFVE,
    facturas_referencia, pruebaReferencia, traza,
    // PROPUESTA 2 · facturación electrónica
    fe, fiscalEstado, dvDIAN, RESPONSABILIDADES_DIAN, TRIBUTO_DIAN, notas_fe, facturaCobrable, plazoDias,
  };
})();
