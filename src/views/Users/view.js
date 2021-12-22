import {
  ArrayField,
  ChipField,
  Create,
  Datagrid,
  DateField,
  Edit,
  List,
  RadioButtonGroupInput,
  ReferenceArrayInput,
  SelectArrayInput,
  SelectField,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin';
import { SimpleArray } from '../misc.js'

const userStatuses = [
  { id: 'active', name: 'Active' },
  { id: 'inactive', name: 'Inactive' },
];

export const list = props => (
  <List {...props} bulkActionButtons={false}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="displayName" />
      <SimpleArray source="roles"/>
      <SelectField source="status" choices={userStatuses}/>
      <DateField source="lastModifiedAt" showTime/>
      <TextField source="lastModifiedBy" />
    </Datagrid>
  </List>
);
//      <TextArrayField source="roles"><SingleFieldList><ChipField source="id" /></SingleFieldList></TextArrayField>

export const edit = props => (
  <Edit mutationMode="pessimistic" {...props}>
    <SimpleForm>
      <TextField source="name" />
      <TextInput source="displayName" />
      <ReferenceArrayInput reference="roles" source="roles">
        <SelectArrayInput>
          <ChipField source="roles" />
        </SelectArrayInput>
      </ReferenceArrayInput>
      <RadioButtonGroupInput source="status" choices={userStatuses}/>
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
      <RadioButtonGroupInput source="status" choices={userStatuses} initialValue="active"/>
    </SimpleForm>
  </Create>
);
