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
import { SimpleArray } from './misc.js'

const developerStatuses = [
  { id: 'active', name: 'Active' },
  { id: 'inactive', name: 'Inactive' },
];

export const UserList = props => (
  <List {...props} bulkActionButtons={false}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="displayName" />
      <SimpleArray source="roles"/>
      <SelectField source="status" choices={developerStatuses}/>
      <DateField source="createdAt" showTime/>
      <TextField source="createdBy" />
      <DateField source="lastModifiedAt" showTime/>
      <TextField source="lastModifiedBy" />
    </Datagrid>
  </List>
);
//      <TextArrayField source="roles"><SingleFieldList><ChipField source="id" /></SingleFieldList></TextArrayField>

export const UserEdit = props => (
  <Edit mutationMode="pessimistic" {...props}>
    <SimpleForm>
      <TextField source="name" />
      <TextInput source="displayName" />
      <ReferenceArrayInput reference="roles" source="roles">
        <SelectArrayInput>
          <ChipField source="roles" />
        </SelectArrayInput>
      </ReferenceArrayInput>
      <RadioButtonGroupInput source="status" choices={developerStatuses}/>
      <DateField source="createdAt" showTime />
      <TextField source="createdBy" />
      <DateField source="lastModifiedAt" showTime />
      <TextField source="lastModifiedBy" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = props => (
  <Create mutationMode="pessimistic" {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="displayName" />
      <RadioButtonGroupInput source="status" choices={developerStatuses} initialValue="active"/>
    </SimpleForm>
  </Create>
);
