$computer = $env:COMPUTERNAME
$namespace = 'ROOT\OpenHardwareMonitor'
$classname = 'Sensor'

Get-WmiObject -Class $classname -ComputerName $computer -Namespace $namespace |
    Select-Object Identifier,Name,Value -ExcludeProperty PSComputerName, Scope, Path, Options, ClassPath, Properties, SystemProperties, Qualifiers, Site, Container |
    Export-Csv -Path 'temp/gpu-infos.csv' -notype -force -Delimiter ';' -Encoding 'UTF8'

return
