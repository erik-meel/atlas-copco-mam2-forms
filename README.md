# LH-atlas-copco-forms

## Requisites

Needed tools:
 - nodejs v5.x.x (https://nodejs.org/)
 - npm v3.x.x (https://www.npmjs.com/)
 - git
 - Prince (optional)

## Setup

### From zip file 
Unzip file into folder (e.g., `my-proj`) and run the following commands:
```bash
npm install
```
It might show some warnings but if there's no errors everything is fine.

### From git repository
Open a command line in your projects folder and run the following commands:
```bash
git clone https://github.com/demula/movilizer-html5-forms.git
cd movilizer-html5-forms
git submodule init
git submodule update --recursive
npm install
```
It might show some warnings but if there's no errors everything is fine.

## Commands available

* `npm run clean` - Cleans the dist and build folders
* `npm run build` - Generates all files for the project in the build folder
* `npm run debug` - Cleans, generates the files and opens the default browser with the form (and live-reload)
* `npm run report` - Cleans, generate a PDF file in the reports folder using the Prince PDF engine
* `npm run dist` - Generates a zip file in the dist folder to be deployed into the Movilizer Cloud
* `npm run dist-all` - Generates a zip file per report in the dist folder to be deployed into the Movilizer Cloud
* `npm run debug-single -- single-report-folder` - Generates the files and opens the default browser with the form antered as param (i.e: npm run debug-single -- report-visit). It has live-reload.
* `npm run dist-single` - Generates a zip file in the dist/{report} folder to be deployed into the Movilizer Cloud (i.e: npm run dist-single -- report-visit)
* `npm run build-single` - Generates web app in the build/{report} folder to be tested locally (i.e: npm run build-single -- report-visit)
* `npm run pdf-single` - Generates a PDF file in the pdf/{report} folder to test simple pdf generation, it needs a build prior to print pdf (i.e: npm run pdf-single -- report-visit)
 
## Project structure

Notable files:

### app/app.component.html
Editable file with the layout and binding of the form.

### styles.css / styles.print.css
Editable css files for form customization.

### mockdata/mockdata.ts
Editable files with the mockup values to be displayed when debugging the form.


## Layout

### Sections
The form is divide in 3 blocks: header, body and footer:
```HTML
<ho-form>
    <ho-header>Form title</ho-header>
    <ho-body>
        Text and boxes corresponding to the content of the form.
    </ho-body>
    <ho-footer>Company extra info</ho-footer>
</ho-form>
```

### Grid system
For laying out nicely the form we provide the tags `<ho-row>` and `<ho-cell>` with it's width attribute `ho-width`.
```HTML
<ho-row>
    <ho-cell ho-width="40%">
        <img id="logo" src="app/logo.svg" alt="Company logo">
    </ho-cell>
    <ho-cell ho-width="60%">
        <h1>Form title</h1>
    </ho-cell>
</ho-row>
```

The rows and cell are nestable.
```HTML
<ho-row>
    <ho-cell ho-width="100%">
        <b>Work Comments</b>
        <ho-row>
            <ho-cell ho-width="100%">
                {{ tag('WORK_COMMENTS') }}
            </ho-cell>
        </ho-row>
    </ho-cell>
</ho-row>
```

If you need them with a border you can do so by adding the attribute `ho-bordered`.
```HTML
<ho-row ho-bordered>
    <ho-cell ho-width="100%" ho-bordered>
        Bordered box
    </ho-cell>
</ho-row>
```

### Line breaks
For HTML elements that must allow new line, we must use one container div this way:

```HTML
<div style="white-space: pre-line;">CONTENT-WITH-LINE-BREAKS</div>
```
or 
```HTML
<p style="white-space: pre-line;">CONTENT-WITH-LINE-BREAKS</p>
```

### Printing specifics (avoid split, page breaks and paging)
When printing, there's times you don't want to have a block broken in between pages. For this very reason you can add the
attribure `ho-avoid-break` to any block that you want to prevent from splitting.

```HTML
<ho-row ho-avoid-break>
    <p>If this block fits in one page the pdf printer will not display it split in two pages.</p>
</ho-row>
```

For page breaks insert the following block into your form where ever you want to force a page break.
```HTML
<ho-page-break></ho-page-break>
```

In the case of displaying the current page, the attribute `ho-page-number` will insert the page numbering message.
```HTML
<ho-footer>
    <ho-row>
        <ho-cell ho-width="100%" ho-text-align="right" ho-page-number></ho-cell>
    </ho-row>
</ho-footer>
```

The default message is `"Page "counter(page)" of "counter(pages)` but you can customize it and use the values of the
counters as follows:

```HTML
<ho-cell ho-width="100%" ho-text-align="right" ho-page-number="counter(page)'/'counter(pages)"></ho-cell>
```

## Binding content
### Getting the data
From `cordova.ts` inside the form you can ask for a root value using the function `tag('FIELD_NAME')` or access to the
MEL variable all together as 'INPUT'.
```HTML
<div>
    {{ tag('FIELD_NAME') }} is the same as {{ INPUT.tag('FIELD_NAME') }}
</div>
```
### ngModel
This attribute is for input tags in the HTML input fields
```HTML
<input type="text" [ngModel]="tag('FIELD_NAME')">
```
More info at [Angular form docs](https://angular.io/docs/ts/latest/guide/forms.html)

### ngIf
Dynamic show a part of the form
```HTML
<div *ngIf="!INPUT.getVar('HIDE_SECTION').has('WORK_DONE')">
    This content will be hidden depending on the condition of ngIf
</div>
```
### ngFor
Dynamic create tables and repeatable data
```HTML
<table>
    <tr *ngFor="let entry of INPUT.getVarArray('MEASUREMENT_POINTS_ENTRIES')">
        <td>{{ entry.tag('COUNTER') }}</td>
        <td>{{ entry.tag('READ_AFTER') }}</td>
    </tr>
</table>
```

## Widgets
### Section header
It displays a nice header for a section over a grey background and a back line below. Can be use as a row.

```HTML
<ho-section-header><b>Time Confirmation</b> section</ho-section-header>
<ho-row>
    <ho-cell ho-width="100%">
        Section content here
    </ho-cell>
</ho-row>
```

### Checkbox
It creates a checkbox that can be customized by changing the images for checked and unchecked.

```HTML
<ho-checkbox checked="{{ entry.tag('DONE')}}" disabled></ho-checkbox>
```

### Radio button
TODO

## Customizing

### Changing standard appearance
### Adding new components

## Debugging
The easiest way and most efficient is to debug on the browser since you'll have there all the debugging tools most
accessible. It's important to notice that any form should be tested on the target devices and also properly tested for
pdf generation.

### 1. the browser
Run `npm run debug` and automatically a new browser will open with the form in debug mode. If you need to debug the dist
mode copy and paste the `cordoba.js` and `plugins` folder from the `movelets` folder and paste into the `build` folder
(you might need to statically serve the `build` folder to be able to run the form in the browser).

### 2. the device
TODO `npm run deploy`

### 3. the pdf
TODO `npm run report`

## Testing
TODO

## Configuration
This project uses webpack for building and packaging the output to a 

### Deployment
During development the zip file can be automatically uploaded as a document to the Movilizer cloud just buy running the
following command:

```bash
npm run dist
```

This command cleans all the temp folders of the project and builds the HTML5 screen for distribution (minimized and
optimized). Then it zips the content and send it to the cloud using the configuration given in the `movilizer.json` file
in the project root folder.

Please be advised that this kind of deployment is only meant for development purposes, a real deployment process has to
be in place in your project to be able to assess which version of the code is uploaded and when, probably after several
testing phases and approvals.
