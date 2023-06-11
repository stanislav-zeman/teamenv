import { MyProject } from '@/models/Project'
import { Role } from '@/models/Role'

export const mockedMyProjects: MyProject[] = [
  {
    id: 'fjabkfa4',
    name: 'React Native for complete retards',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris elementum mauris vitae tortor. Aliquam erat volutpat. Et harum quidem rerum facilis est et expedita distinctio. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Nullam at arcu a est sollicitudin euismod. Aliquam ornare wisi eu metus. Aliquam erat volutpat. Aliquam ante. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Donec iaculis gravida nulla. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Etiam dictum tincidunt diam. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat.',
    owner: {
      id: 'i1f5a31f',
      userName: 'xxJozinZBazinxx',
      fullName: 'Petr Novák',
    },
    myRole: Role.GUEST,
  },
  {
    id: 'fjabkf89',
    name: 'CSS vs SQL',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris elementum mauris vitae tortor. Aliquam erat volutpat. Et harum quidem rerum facilis est et expedita distinctio. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Nullam at arcu a est sollicitudin euismod. Aliquam ornare wisi eu metus. Aliquam erat volutpat. Aliquam ante. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Donec iaculis gravida nulla. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Etiam dictum tincidunt diam. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat.',
    owner: {
      id: 'i1f5a31g',
      userName: 'xxJIDDKxx',
      fullName: 'Ignác Boleslav',
    },
    myRole: Role.OWNER,
  },
  {
    id: 'fjabfa',
    name: 'IDK FAKT UŽ',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris elementum mauris vitae tortor. Aliquam erat volutpat. Et harum quidem rerum facilis est et expedita distinctio. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Nullam at arcu a est sollicitudin euismod. Aliquam ornare wisi eu metus. Aliquam erat volutpat. Aliquam ante. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Donec iaculis gravida nulla. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Etiam dictum tincidunt diam. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat.',
    owner: {
      id: 'i1f5a3fafa',
      userName: 'xxJIKxx',
      fullName: 'Tomáš Fuk',
    },
    myRole: Role.DEVELOPER,
  },
]
