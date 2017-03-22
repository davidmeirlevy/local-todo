
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './modules/core/config/app.module';


const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);