#!/bin/bash
# Prepara los formatos en papel de Comserva (fuentes/) para el video:
# rota, recorta y tapa el NIT del cliente, las direcciones, los teléfonos y las cuentas bancarias.
# Uso: bash tools/preparar-papel.sh  (desde video-alcances/)
set -e
cd "$(dirname "$0")/.."
F=bin/ffmpeg
FUENTES=../../fuentes
TMP=$(mktemp -d)
mkdir -p assets/img
qlmanage -t -s 2400 -o "$TMP" "$FUENTES/FORMATO RH.pdf" "$FUENTES/RECIBIO DE CAJA.pdf" "$FUENTES/FORMATO FACTURA.pdf" >/dev/null 2>&1
# Planilla RH escrita a mano (Cofema, septiembre): tapa el NIT y corta el pie con dirección y teléfonos
$F -y -loglevel error -i "$TMP/FORMATO RH.pdf.png" -vf "transpose=1,drawbox=x=1235:y=700:w=420:h=82:color=white:t=fill,crop=2110:1610:232:62" assets/img/papel-rh.png
# Recibo de caja provisional en blanco: corta el pie con dirección y teléfonos
$F -y -loglevel error -i "$TMP/RECIBIO DE CAJA.pdf.png" -vf "crop=2250:1390:75:0" assets/img/papel-recibo.png
# FVE 25756 real de Helisa: solo el encabezado del número y el cuadro de totales
$F -y -loglevel error -i "$TMP/FORMATO FACTURA.pdf.png" -vf "crop=560:300:1236:0" assets/img/fve-encabezado.png
$F -y -loglevel error -i "$TMP/FORMATO FACTURA.pdf.png" -vf "crop=616:290:1106:1296" assets/img/fve-totales.png
rm -rf "$TMP"
echo "papel listo"
