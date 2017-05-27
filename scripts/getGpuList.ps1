$computer = $env:COMPUTERNAME
$namespace = 'ROOT\OpenHardwareMonitor'
$classname = 'Hardware'

Get-WmiObject -Class $classname -ComputerName $computer -Namespace $namespace |
    Select-Object Identifier,Name -ExcludeProperty PSComputerName, Scope, Path, Options, ClassPath, Properties, SystemProperties, Qualifiers, Site, Container |
    Export-Csv -Path 'temp/gpu-list.csv' -notype -force -Delimiter ';' -Encoding 'UTF8'

return
