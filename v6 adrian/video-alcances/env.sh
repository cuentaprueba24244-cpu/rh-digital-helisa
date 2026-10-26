# Uso: source env.sh  — deja ffmpeg/ffprobe del proyecto en el PATH (no requiere Homebrew)
HERE="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
export PATH="$HERE/bin:$HERE/node_modules/.bin:$PATH"
export HYPERFRAMES_NO_UPDATE_CHECK=1
