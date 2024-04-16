import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));


/* TODO: Profile page from zero
         FAQ page from zero
         LoginRegister transition animation
         Fix responsive payments page
         Support window
         Upgrade header, footer
 */

