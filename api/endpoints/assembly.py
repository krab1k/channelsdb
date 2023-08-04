import requests
import json
from fastapi import HTTPException

from api.main import app
from api.common import PDB_ID_Type


@app.get('/assembly/{pdb_id}', name='Assembly', tags=['PDB'], description='Returns prefered assembly for a given protein')
async def get_assembly_id(pdb_id: PDB_ID_Type) -> str:
    req = requests.get(f'https://www.ebi.ac.uk/pdbe/api/pdb/entry/summary/{pdb_id}')
    if req.status_code != 200:
        raise HTTPException(status_code=404, detail='Cannot find assembly for PDB ID \'{pdb_id}\'')
    data = json.loads(req.content)[pdb_id][0]['assemblies']
    return next(assembly['assembly_id'] for assembly in data if assembly['preferred'])
