const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src/features/corporate-admin/pages');
const targetDir = path.join(__dirname, 'src/pages/corporate');

const files = [
    'Analytics.jsx', 'Billing.jsx', 'Campaigns.jsx', 'OrgProfile.jsx',
    'Programmes.jsx', 'Security.jsx', 'Settings.jsx', 'SuperAdmin.jsx', 'Support.jsx'
];

files.forEach(file => {
    const content = fs.readFileSync(path.join(srcDir, file), 'utf8');

    // Replace useAuthStore with Redux
    let newContent = content.replace(/import \{ useAuthStore \} from '\.\.\/(store|features\/corporate-admin\/store)'/g, "import { useSelector } from 'react-redux';\nimport { RootState } from '../../store'");
    newContent = newContent.replace(/const \{ org, admin \} = useAuthStore\(\)/g, "const { user } = useSelector((state) => state.auth);\n  const org = { displayName: user?.corporateProfile?.department || 'Organisation' };\n  const admin = user;");
    newContent = newContent.replace(/const \{ admin \} = useAuthStore\(\)/g, "const { user } = useSelector((state) => state.auth);\n  const admin = user;");

    // Fix UI imports
    newContent = newContent.replace(/import \{(.+)\} from '\.\.\/components\/ui'/g, "import {$1} from '../../features/corporate-admin/components/ui'");

    fs.writeFileSync(path.join(targetDir, file), newContent, 'utf8');
});
console.log('Copied and transformed pages');
