#!/bin/bash
# Normaliza la música a −16 LUFS con pico real de −1,5 dBTP y la deja en assets/audio/musica.m4a
set -e
cd "$(dirname "$0")/.."
bin/ffmpeg -y -loglevel error -i assets/audio/musica.wav -af "loudnorm=I=-16:TP=-2.5:LRA=11" -ar 48000 -c:a aac -b:a 192k assets/audio/musica.m4a
rm -f assets/audio/musica.wav
echo "musica.m4a listo"
