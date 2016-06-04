/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  '@angular2-material': 'vendor/@angular2-material',
  '@ngrx': 'vendor/@ngrx',
  'angualr2-jwt': 'vendor/angular2-jwt'
};

const packages:any = {};

const materialPkgs:string[] = [
  'button',
  'card',
  'checkbox',
  'core',
  'grid-list',
  'icon',
  'input',
  'list',
  'progress-bar',
  'progress-circle',
  'radio',
  'sidenav',
  'toolbar',
];

materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});




////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core', '@angular/common', '@angular/compiler', '@angular/http', '@angular/router',
  '@angular/router-deprecated', '@angular/platform-browser', '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs', 'ng2-material', '@ngrx/core', '@ngrx/store',

  // App specific barrels.
  'app', 'app/shared', 'app/shared/api',
  'app/user-account/signup',
  'app/home',
  'app/role',
  'app/role/shared',
  'app/role/role-detail',
  'app/role/role-list',
  'app/user',
  'app/user/shared',
  'app/user/user-detail',
  'app/user/user-list',
  'app/shared/components',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => { cliSystemConfigPackages[barrelName] = {main: 'index'}; });

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    '@ngrx': 'vendor/@ngrx',
    'ng2-material': 'vendor/ng2-material',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'

  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({map, packages});
