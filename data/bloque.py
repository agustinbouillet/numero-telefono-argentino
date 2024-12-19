
from itertools import groupby
from operator import itemgetter
import json


def get_ranges(data):
    '''
    Obtiene los rangos de números consecutivos
    '''
    ranges =[]
    for k,g in groupby(enumerate(data),lambda x:x[0]-x[1]):
        group = (map(itemgetter(1),g))
        group = list(map(int,group))
        ranges.append( [group[0],group[-1]] )
    # ranges.sort(reverse=True)
    return ranges


with open('./enacom__numeracion-geografica__2024-12.json', 'r') as f:
    data = json.loads( f.read() )    
    
    # Obtengo los números de area
    values = data['values']
    values.pop(0)
    area_codes = list(set( [ int(i[4]) for i in values] ))
    area_codes.sort()
    
    # Obtengo los bloques por codigo de area
    ranges = {}
    for code in area_codes:
        ranges[code] = []
        acumulate = []
        for i in values:
        
            if( int( i[4] ) == int(code) ):
                acumulate.append(int(i[5]))
                
        acc = list(set(acumulate))
        
        ranges[code] = get_ranges(acc)
        
with open('./block-ranges.json', 'w') as f:
    f.write(json.dumps(ranges))
        
# print(ranges)
# print('-' * 80)
# print(area_codes)