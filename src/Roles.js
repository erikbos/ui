import {
  ArrayField,
  ChipField,
  Create,
  Datagrid,
  DateField,
  Edit,
  List,
  ReferenceField,
  SimpleForm,
  SingleFieldList,
  TextField,
  TextInput,
} from 'react-admin';

export const RoleList = props => (
  <List {...props} bulkActionButtons={false}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="displayName" />
      <ArrayField source="permissions">
        <SingleFieldList><ChipField source="methods" /></SingleFieldList>
      </ArrayField>
      <DateField source="createdAt" showTime />
      <TextField source="createdBy" />
      <DateField source="lastModifiedAt" showTime />
      <TextField source="lastModifiedBy" />
    </Datagrid>
  </List>
);

export const RoleEdit = props => (
  <Edit mutationMode="pessimistic" {...props}>
    <SimpleForm>
      <TextField source="name" />
      <TextInput source="displayName" />
      <ArrayField source="permissions">
        <SingleFieldList><ChipField source="methods" />
      </SingleFieldList></ArrayField>
      <DateField source="createdAt" showTime disabled />
      <ReferenceField source="createdBy" reference="users">
          <TextField source="createdBy" />
      </ReferenceField>
      <TextField source="createdBy" />
      <DateField source="lastModifiedAt" showTime />
      <TextField source="lastModifiedBy" />
    </SimpleForm>
  </Edit>
);

export const RoleCreate = props => (
  <Create mutationMode="pessimistic" {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="displayName" />
      <ArrayField source="permissions">
          <SingleFieldList><ChipField source="methods" />
        </SingleFieldList>
      </ArrayField>
    </SimpleForm>
  </Create>
);
