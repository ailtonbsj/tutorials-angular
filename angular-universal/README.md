## Commands

```bash
# Create project
ng new angular-universal
cd angular-universal

# Create components
ng g c list-items
ng g c show-item

# Enable Server-Side Rendering (SSR)
ng add @nguniversal/express-engine

# Run with SSR
npm run build:ssr
PORT=4200 npm run serve:ssr
```