import { Badge, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from '@tremor/react';
import data from '../temp/data.json';


const TableBase = () => {



    return (
      <Card>
          <Title>Lista de datos </Title>
  
          <Table className='mt-5'>
              <TableHead>
                  <TableRow>
                      <TableHeaderCell>Nombre</TableHeaderCell>
                      <TableHeaderCell>Posicion</TableHeaderCell>
                      <TableHeaderCell>Departamento</TableHeaderCell>
                      <TableHeaderCell>Estado</TableHeaderCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  { data.map( (item) => (
                      <TableRow>
                          <TableCell> {item.Role} </TableCell>
                          <TableCell> {item.departement} </TableCell>
                          <TableCell> {item.name} </TableCell>
                          <TableCell> <Badge color="yellow">{item.status}</Badge></TableCell>
                      </TableRow>    
                  )) }
              </TableBody>
          </Table>
  
      </Card>
    )
  }
  
  export default TableBase