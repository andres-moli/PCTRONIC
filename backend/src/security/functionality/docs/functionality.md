
# Functionality and permissions

We currently have three roles where each one has different permissions:

- **User:** Citizen user
- **Admin:** System administrator user
- **SuperAdmin:** Super Admin

## Assignment of permissions to services

Currently, we have a decorator in charge of verifying a user's ability to access services: ``Functionality`` or ``FunctionalityResolver``. This decorator is activated in different contexts. It is important to note that the user with the SuperAdmin role has full permissions, so he inherently has unrestricted access to services.

### Use

To use this decorator, simply invoke it and provide the necessary permissions that the user must have to access the service:

```typescript
Functionality(FunctionalityKeys.REMOVE)
```

#### Be careful

Throughout the project we have different ```FunctionalityKeys```, so be careful which one you are using.

### Context #1

We have to call our function in the ```CrudResolverStructure``` inside the decorators of the specific service. The decorator we will use in this case is: ```Functionality()```.

```typescript
const resolverStructure = CrudResolverStructure({
  ...serviceStructure,
  serviceType: /* Your Service */,
  name:{ name: 'Your name', decorators:[ Functionality( /*FunctionalityKeys.YOUR_KEY*/) ] },
});
```

### Context #2

We have to call our function in an individual resolver. The decorator to be used in this context is: ```FunctionalityResolver()```.

```typescript
  @FunctionalityResolver( /* FunctionalityKeys.YOUR_KEY */ )
  @Mutation(() => {}, {name: "YourName"})
  @AnyUser()
  YourName(){
    return /* Your Service*/
  }
```