"""Convierte dist/ en una copia con enlaces relativos (para la vista previa en claude.ai)."""
import json, os, re, shutil, sys

SRC = 'dist'
DST = sys.argv[1]
if os.path.exists(DST):
    shutil.rmtree(DST)
shutil.copytree(SRC, DST)


def rel(target, depth):
    pre = '../' * depth
    path = target.lstrip('/')
    path, _, frag = path.partition('#')
    path, _, query = path.partition('?')
    if path == '':
        return (pre or './') + (('#' + frag) if frag else '')
    if path.endswith('/'):
        path += 'index.html'
    elif '.' not in path.split('/')[-1]:
        path += '/index.html'
    out = pre + path
    if query:
        out += '?' + query
    if frag:
        out += '#' + frag
    return out


for root, _, files in os.walk(DST):
    for f in files:
        full = os.path.join(root, f)
        relpath = os.path.relpath(full, DST)
        depth = relpath.count('/')
        if f.endswith('.html'):
            s = open(full, encoding='utf-8').read()
            s = re.sub(r'(href|src|data-indice)="(/[^"/][^"]*|/)"', lambda m: f'{m.group(1)}="{rel(m.group(2), depth)}"', s)
            open(full, 'w', encoding='utf-8').write(s)
        elif f == 'buscar.json':
            data = json.load(open(full, encoding='utf-8'))
            for d in data:
                d['url'] = rel(d['url'], 1)
            json.dump(data, open(full, 'w', encoding='utf-8'), ensure_ascii=False)
        elif f.endswith('.css'):
            s = open(full, encoding='utf-8').read()
            s = re.sub(r'url\(/', 'url(../', s)
            open(full, 'w', encoding='utf-8').write(s)

# La portada se publica sin <html>/<head>/<body>: el visor añade su propio esqueleto.
idx = os.path.join(DST, 'index.html')
s = open(idx, encoding='utf-8').read()
s = re.sub(r'<!DOCTYPE html>', '', s, flags=re.I)
s = re.sub(r'<html[^>]*>|</html>|<head>|</head>|<body[^>]*>|</body>', '', s)
s = re.sub(r'<meta charset="utf-8"\s*/?>|<meta name="viewport"[^>]*>', '', s)
open(idx, 'w', encoding='utf-8').write(s)
print('ok')
