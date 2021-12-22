import {
  ArrayInput,
  Create,
  Datagrid,
  DateField,
  Edit,
  List,
  NumberField,
  NumberInput,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
} from 'react-admin';
import { SimpleArray } from '../misc.js'

export const list = props => (
<List {...props} bulkActionButtons={false}>
  <Datagrid rowClick="edit">
    <TextField source="name" />
    <TextField source="displayName" />
    <SimpleArray source="virtualHosts" />
    <NumberField source="port" />
    <TextField source="routeGroup" />
    <TextField source="policies" />
    <DateField source="lastModifiedAt" showTime />
    <TextField source="LastModifiedBy" />
  </Datagrid>
</List>
);

export const edit = props => (
  <Edit mutationMode="pessimistic" {...props}>
    <SimpleForm>
      <TextField source="name" />
      <TextInput source="displayName" />
      <ArrayInput source="virtualHosts">
        <SimpleFormIterator>
          <TextInput label="virtualhost"/>
        </SimpleFormIterator>
      </ArrayInput>
      <NumberInput source="port" />
      <TextInput source="routeGroup" />
      <TextInput source="policies" />
      <DateField source="createdAt" showTime />
      <TextField source="createdBy" />
      <DateField source="lastModifiedAt" showTime />
      <TextField source="lastModifiedBy" />
    </SimpleForm>
  </Edit>
);

export const create = props => (
  <Create mutationMode="pessimistic" {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="displayName" />
      <ArrayInput source="virtualHosts">
      <SimpleFormIterator>
          <TextInput label="virtualhost"/>
        </SimpleFormIterator>
      </ArrayInput>
      <NumberInput source="port" />
      <TextInput source="routeGroup" />
      <TextInput source="policies" />
    </SimpleForm>
  </Create>
);
